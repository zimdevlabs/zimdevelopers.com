import { z } from "zod";

const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
  "zoho.com",
  "yandex.com",
  "gmx.com",
];

export const signupWithEmailSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .refine((value) => {
      const nameParts = value.trim().split(/\s+/);
      return nameParts.length >= 2;
    }, "Please enter a name and surname."),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return !PERSONAL_EMAIL_DOMAINS.includes(domain);
      },
      {
        message: "Please use your work email address",
      },
    ),
  speciality: z.string().min(1, "Speciality is required."),
  code: z.string().min(1, "Code is required."),
});

export type EmailSignUpInput = z.infer<typeof signupWithEmailSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  code: z.string().min(1, "Code is required."),
});
export type LoginInput = z.infer<typeof loginSchema>;
