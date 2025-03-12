"use server";

import { EmailSignUpInput, signupWithEmailSchema } from "./validators";

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
      },
    };
  }

  const { email } = parsed.data;
  
  try {
    console.log(email);
    return { done: true, successMessage: "Account created successfully" };
  } catch (e) {
    console.log(e);
    return { formError: `An error has occured: ${e}` };
  }
}