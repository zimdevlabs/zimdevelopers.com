import { z } from "zod";

export const createDevProfileShema = z.object({
  username: z.string().min(1, "Username is required."),
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
