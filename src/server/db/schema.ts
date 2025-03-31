import {
  pgTableCreator,
  serial,
  boolean,
  index,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { DATABASE_PREFIX as prefix } from "@/lib/constants";

export const pgTable = pgTableCreator((name) => `${prefix}_${name}`);

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    googleId: varchar("google_id", { length: 21 }).unique(),
    githubId: varchar("github_id", { length: 21 }).unique(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    whatsAppNumber: varchar("whatsapp_number", { length: 15 }),
    whatsappNumberVerified: boolean("whatsapp_number_verified").default(false).notNull(),
    idVerified: boolean("id_verified").default(false).notNull(),
    avatar: varchar("avatar", { length: 255 }),
    name: varchar("name", { length: 32 }).notNull(),
    username: varchar("username", { length: 48 }).unique().notNull(),
    city: varchar("city", { length: 32 }),
    profileCompleted: boolean("profile_completed").default(false),
    totalPoints: integer("total_points").notNull().default(0),
    role: varchar("role", { length: 8 }),
    speciality: varchar("speciality", { length: 12 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    tierId: varchar("tier_id", { length: 15 }),
    currentPeriodEnd: timestamp("current_period_end"),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
    googleIdx: index("user_google_idx").on(t.googleId),
    githubIdx: index("user_github_idx").on(t.githubId),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => ({
    userIdx: index("session_user_idx").on(t.userId),
  }),
);

export const emailVerificationCodes = pgTable(
  "email_verification_codes",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => ({
    emailIdx: index("verification_code_email_idx").on(t.email),
  }),
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: varchar("id", { length: 40 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (t) => ({
    userIdx: index("password_token_user_idx").on(t.userId),
  }),
);
