import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .refine((value) => {
      const nameParts = value.trim().split(/\s+/);
      return nameParts.length >= 2;
    }, "Please enter a name and surname."),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password is too short. Minimum 8 characters required.")
    .max(255),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const commentSchema = z.object({
  articleId: z.string().min(1, "Article ID is required"),
  userId: z.string().min(1, "User ID is required"),
  commentText: z
    .string()
    .min(2, "Comment must be at least 2 characters long")
    .regex(/^[\w\s.,!?'"-]*$/, "Comment contains invalid characters")
    .trim(),
  parentCommentId: z.string().optional(),
});

export type CommentInput = z.infer<typeof commentSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password is too short. Minimum 8 characters required.")
    .max(255),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Invalid token"),
  password: z.string().min(8, "Password is too short").max(255),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const editCommentSchema = z.object({
  commentId: z.string().min(1, "Comment ID is required"),
  editedText: z
    .string()
    .min(2, "Comment must be at least 2 characters long")
    .regex(/^[\w\s.,!?'"-]*$/, "Comment contains invalid characters")
    .trim(),
});

export type EditCommentInput = z.infer<typeof editCommentSchema>;
