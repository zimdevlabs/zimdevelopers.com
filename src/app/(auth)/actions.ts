"use server";

import { db } from "@/server/db";
import { EmailSignUpInput, signupWithEmailSchema } from "./validators";
import { isWithinExpirationDate } from "lucia/dist/date";
import { emailVerificationCodes, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Paths } from "@/lib/constants";
import { generateRandomString, alphabet } from "oslo/crypto";
import { createDate, TimeSpan } from "oslo";
import { EmailTemplate, sendMail } from "@/lib/email";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
  successMessage?: string;
  done?: boolean;
}

export async function signup_with_email(_: any,
  formData: FormData): Promise<ActionResponse<EmailSignUpInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupWithEmailSchema.safeParse(obj);
  
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        name: err.fieldErrors.name?.[0],
        speciality: err.fieldErrors.speciality?.[0],
        code: err.fieldErrors.code?.[0],
      },
    };
  }

  const { email, code, speciality, name } = parsed.data;

   const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true },
  });

  if (existingUser) {
    return {
      formError: "Cannot create account with that email",
    };
  }

  const dbCode = await db.query.emailVerificationCodes.findFirst({
    where: (table, { eq }) => eq(table.code, code),
  });

  if (!dbCode || dbCode.code !== code) {
    return { formError: "Invalid verification code" };
  }

   if (!isWithinExpirationDate(dbCode.expiresAt)) {
    return { formError: "Verification code expired" };
  }

   if (dbCode.email !== email) {
    return { formError: "Email does not match" };
  }

  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.id, dbCode.id));
    
  const userId = generateId(21);
  const userName = generateId(8);

  await db.insert(users).values({
    id: userId,
    name,
    email,
    username: `ib-${userName}`,
    speciality,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect(Paths.Dashboard)
  
  // try {
  //   console.log(email);
  //   return { done: true, successMessage: "Account created successfully" };
  // } catch (e) {
  //   console.log(e);
  //   return { formError: `An error has occured: ${e}` };
  // }
}

const timeFromNow = (time: Date) => {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
};

async function generateEmailVerificationCode(email: string): Promise<string> {
  await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.email, email));
  const code = generateRandomString(6, alphabet("0-9")); // 6 digit code
  await db.insert(emailVerificationCodes).values({
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
  });
  return code;
}



export async function sendVerificationEmail(email: string): Promise<{
  error?: string;
  success?: boolean;
}> {
  const lastSent = await db.query.emailVerificationCodes.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { expiresAt: true },
  });

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    return {
      error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
    };
  }

  const verificationCode = await generateEmailVerificationCode(email);
  await sendMail(email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });

   return { success: true };
}