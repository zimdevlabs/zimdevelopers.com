"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";
import { isWithinExpirationDate, TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { db } from "@/server/db";
import {
  loginSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
  resetPasswordSchema,
} from "@/lib/validators/auth";
import {
  commentReports,
  emailVerificationCodes,
  passwordResetTokens,
  users,
} from "@/server/db/schema";
import { sendMail, EmailTemplate } from "@/lib/email";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "../constants";
import { env } from "@/env";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function login(
  _: any,
  formData: FormData,
): Promise<ActionResponse<LoginInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  });

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password,
  );
  if (!validPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  const callbackUrl = formData.get("callbackUrl") as string;

  return redirect(callbackUrl || `/${existingUser.username}`);
}

export async function signup(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);

  if (!parsed.success) {
    const err = parsed.error.flatten();

    return {
      fieldError: {
        name: err.fieldErrors.name?.[0],
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true },
  });

  if (existingUser) {
    return {
      formError: "Cannot create account with that email",
    };
  }

  const userId = generateId(21);
  const hashedPassword = await new Scrypt().hash(password);
  const userName = generateId(8);

  await db.insert(users).values({
    id: userId,
    fullName: name,
    email,
    hashedPassword,
    username: `zimdev-${userName}`,
  });

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendMail(email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  const callbackUrl = formData.get("callbackUrl") as string;

  return redirect(
    callbackUrl
      ? `${Paths.VerifyEmail}?callbackUrl=${callbackUrl}`
      : Paths.VerifyEmail,
  );
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "No session found",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function resendVerificationEmail(): Promise<{
  error?: string;
  success?: boolean;
}> {
  const { user } = await validateRequest();
  if (!user) {
    return redirect(Paths.Login);
  }
  const lastSent = await db.query.emailVerificationCodes.findFirst({
    where: (table, { eq }) => eq(table.userId, user.id),
    columns: { expiresAt: true },
  });

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    return {
      error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
    };
  }
  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email,
  );
  await sendMail(user.email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });

  return { success: true };
}

export async function verifyEmail(
  _: any,
  formData: FormData,
): Promise<{ error?: string; done?: boolean } | void> {
  const code = formData.get("code");
  if (typeof code !== "string" || code.length !== 8) {
    return { error: "Invalid code" };
  }
  const { user } = await validateRequest();
  if (!user) {
    return redirect(Paths.Login);
  }

  // Find the verification code
  const dbCode = await db.query.emailVerificationCodes.findFirst({
    where: (table, { eq }) => eq(table.userId, user.id),
  });

  if (!dbCode || dbCode.code !== code) {
    return { error: "Invalid verification code" };
  }

  if (!isWithinExpirationDate(dbCode.expiresAt)) {
    return { error: "Verification code expired" };
  }

  if (dbCode.email !== user.email) {
    return { error: "Email does not match" };
  }

  // Delete the verification code
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.id, dbCode.id));

  // Update user's email verification status
  await db
    .update(users)
    .set({ emailVerified: true })
    .where(eq(users.id, user.id));

  // Invalidate existing sessions and create a new one
  await lucia.invalidateUserSessions(user.id);
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  const callbackUrl = formData.get("callbackUrl") as string;
  redirect(callbackUrl ? callbackUrl : `/${user.username}`);
}

export async function sendPasswordResetLink(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email");
  const parsed = z.string().trim().email().safeParse(email);
  if (!parsed.success) {
    return { error: "Provided email is invalid." };
  }
  try {
    const user = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, parsed.data),
    });

    if (!user || !user.emailVerified)
      return { error: "Provided email is invalid." };

    const verificationToken = await generatePasswordResetToken(user.id);

    const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`;

    await sendMail(user.email, EmailTemplate.PasswordReset, {
      link: verificationLink,
    });

    return { success: true };
  } catch (error) {
    return { error: `Failed to send verification email: ${error}` };
  }
}

export async function resetPassword(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = resetPasswordSchema.safeParse(obj);

  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      error: err.fieldErrors.password?.[0] ?? err.fieldErrors.token?.[0],
    };
  }
  const { token, password } = parsed.data;

  // Find the password reset token
  const dbToken = await db.query.passwordResetTokens.findFirst({
    where: (table, { eq }) => eq(table.id, token),
  });

  if (!dbToken) return { error: "Invalid password reset link" };

  if (!isWithinExpirationDate(dbToken.expiresAt))
    return { error: "Password reset link expired." };

  // Delete the used token
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.id, dbToken.id));

  await lucia.invalidateUserSessions(dbToken.userId);
  const hashedPassword = await new Scrypt().hash(password);
  await db
    .update(users)
    .set({ hashedPassword })
    .where(eq(users.id, dbToken.userId));
  const session = await lucia.createSession(dbToken.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  const { user } = await validateRequest();

  redirect(user ? `/${user.username}` : Paths.Home);
}

const timeFromNow = (time: Date) => {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
};

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId));
  const code = generateRandomString(8, alphabet("0-9")); // 8 digit code
  await db.insert(emailVerificationCodes).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
  });
  return code;
}

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));
  const tokenId = generateId(40);
  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });
  return tokenId;
}

export async function getEmailVerificationCode(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const userId = formData.get("userId") as string;
  const email = formData.get("email") as string;

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendMail(email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });
  redirect(Paths.VerifyEmail);
}

export async function reportComment(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const userId = formData.get("userId") as string;
  const commentId = formData.get("commentId") as string;
  const reason = formData.get("reason") as string;

  const reportId = generateId(21);
  await db.insert(commentReports).values({
    id: reportId,
    commentId,
    reason,
    reporterId: userId,
  });

  return { success: true };
}
