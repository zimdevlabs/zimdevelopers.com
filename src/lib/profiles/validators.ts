import { z } from "zod";

export const createDevProfileShema = z.object({
  userId: z.string().min(1, "User ID is required."),
  bio: z
    .string()
    .min(1, "Bio is required.")
    .max(60, "Bio must be less than 500 characters."),
  skills: z.string().min(1, "Skills are required."),
  country: z.string().min(1, "Country is required."),
  city: z.string().min(1, "City is required."),
  avatar: z
    .string()
    .min(1, "Avatar is required.")
    .url("Avatar must be a valid URL."),
  linkedInUrl: z
    .string()
    .min(1, "LinkedIn URL is required.")
    .url("LinkedIn URL must be a valid URL."),
  otherLinks: z.string().optional(),
});

export type CreateDevProfileInput = z.infer<typeof createDevProfileShema>;

export const createEmpProfileSchema = z
  .object({
    userId: z.string().min(1, "User ID is required."),
    type: z.enum(["company", "individual"]),
    companyName: z.string().optional(),
    title: z.string().optional(),
    bio: z
      .string()
      .max(160, "Bio cannot be longer than 160 characyers")
      .optional(),
    country: z.string().min(1, "Country is required."),
    city: z.string().min(1, "City is required."),
    avatar: z
      .string()
      .min(1, "Avatar is required.")
      .url("Avatar must be a valid URL."),
    socialLink: z
      .string()
      .min(1, "LinkedIn URL is required.")
      .url("LinkedIn URL must be a valid URL."),
  })
  .superRefine((data, ctx) => {
    if (data.type === "company" && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company name is required for company type.",
      });
    }
    if (data.type === "company" && !data.bio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bio is required for company type.",
      });
    }
    if (data.type === "individual" && data.title) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Title should be provided for individual type.",
      });
    }
  });

export type CreateEmpProfileInput = z.infer<typeof createEmpProfileSchema>;
