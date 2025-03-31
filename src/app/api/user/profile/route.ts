import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const profileUpdateSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .refine((value) => {
      const nameParts = value.trim().split(/\s+/);
      return nameParts.length >= 2;
    }, "Please enter a name and surname."),
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(48, { message: "Username must not be longer than 48 characters." })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Username can only include letters, numbers, underscores, and hyphens." }),
  whatsAppNumber: z.string().optional(),
  city: z.string().optional(),
  avatar: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

async function getUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  
  if (!sessionId) {
    return null;
  }
  
  try {
    const { user } = await lucia.validateSession(sessionId);
    return user;
  } catch {
    // If the session is invalid, we'll return null
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    
    const formData = await request.formData();
    const method = formData.get("_method");
    
    // Handle PATCH requests
    if (method === "PATCH") {
      const data = {
        name: formData.get("name") as string,
        username: formData.get("username") as string,
        whatsAppNumber: formData.get("whatsAppNumber") as string,
        city: formData.get("city") as string,
        avatar: formData.get("avatar") as string,
      };
      
      // Validate the data
      const validatedData = profileUpdateSchema.safeParse(data);
      
      if (!validatedData.success) {
        return NextResponse.redirect(new URL(`/profile?error=${encodeURIComponent("Invalid form data")}`, request.url));
      }
      
      // Check if username is already taken (but not by current user)
      if (validatedData.data.username !== user.username) {
        const existingUser = await db.query.users.findFirst({
          where: (table) => eq(table.username, validatedData.data.username),
          columns: { id: true },
        });
        
        if (existingUser && existingUser.id !== user.id) {
          return NextResponse.redirect(new URL(`/profile?error=${encodeURIComponent("Username already taken")}`, request.url));
        }
      }
      
      // Update user profile
      await db.update(users)
        .set({
          name: validatedData.data.name,
          username: validatedData.data.username,
          whatsAppNumber: validatedData.data.whatsAppNumber || null,
          city: validatedData.data.city || null,
          avatar: validatedData.data.avatar || null,
          profileCompleted: true,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));
      
      return NextResponse.redirect(new URL("/profile?success=true", request.url));
    }
    
    return NextResponse.json({ error: "Method not supported" }, { status: 405 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.redirect(new URL(`/profile?error=${encodeURIComponent("Server error")}`, request.url));
  }
} 