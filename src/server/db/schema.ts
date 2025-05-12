import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  boolean,
  index,
  text,
  timestamp,
  varchar,
  integer,
  primaryKey,
  jsonb,
  pgEnum,
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
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date(),
    ),
    fullName: varchar("full_name", { length: 32 }).notNull(),
    username: varchar("username", { length: 48 }).unique().notNull(),
    country: varchar("country", { length: 60 }),
    city: varchar("city", { length: 32 }),
    devProfileCompleted: boolean("dev_profile_completed").default(false),
    empProfileCompleted: boolean("emp_profile_completed").default(false),
    totalPoints: integer("total_points").notNull().default(0),
    role: varchar("role", { length: 8 }),
    communicationSettings: jsonb("communication_settings").default({
      preferences: {
        ads: false,
        account: false,
        notifications: false,
      },
    }),
    tierId: varchar("tier_id", { length: 15 }),
    currentPeriodEnd: timestamp("current_period_end"),
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
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("session_user_idx").on(t.userId),
  }),
);

export const emailVerificationCodes = pgTable(
  "email_verification_codes",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 21 }).unique().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("verification_code_user_idx").on(t.userId),
    emailIdx: index("verification_code_email_idx").on(t.email),
  }),
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: varchar("id", { length: 40 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("password_token_user_idx").on(t.userId),
  }),
);

export const comments = pgTable(
  "comments",
  {
    commentId: varchar("comment_id", { length: 21 }).primaryKey(),
    articleId: varchar("article_id", { length: 50 }).notNull(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    commentText: text("comment_text").notNull(),
    parentCommentId: varchar("parent_comment_id", { length: 21 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
    likesCount: integer("likes_count").default(0).notNull(),
    dislikesCount: integer("dislikes_count").default(0).notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => ({
    articleIdx: index("comment_article_idx").on(t.articleId),
    userIdx: index("comment_user_idx").on(t.userId),
    parentCommentIdx: index("comment_parent_comment_idx").on(t.parentCommentId),
    articleUserIdx: index("comment_article_user_idx").on(t.articleId, t.userId),
  }),
);

export type CommentType = typeof comments.$inferSelect;
export type NewCommentType = typeof comments.$inferInsert;

export const commentReactions = pgTable(
  "comment_reactions",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    commentId: varchar("comment_id", { length: 21 }).notNull(),
    reaction: varchar("reaction", { length: 10 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    commentIdx: index("comment_reaction_comment_idx").on(t.commentId),
    userIdx: index("comment_reaction_user_idx").on(t.userId),
    userCommentReactionIdx: index("user_comment_reaction_idx").on(
      t.userId,
      t.commentId,
      t.reaction,
    ),
  }),
);

export type CommentLike = typeof commentReactions.$inferSelect;
export type NewCommentLike = typeof commentReactions.$inferInsert;

export const actionTakenEnum = pgEnum("action_taken", [
  "none",
  "hidden",
  "deleted",
]);
export const statusEnum = pgEnum("comment_report_status", [
  "pending",
  "reviewed",
  "resolved",
]);

export const commentReports = pgTable(
  "comment_reports",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    commentId: varchar("comment_id", { length: 21 })
      .notNull()
      .references(() => comments.commentId),
    reporterId: varchar("reporter_id", { length: 21 })
      .notNull()
      .references(() => users.id),
    reason: varchar("reason").notNull(),
    status: statusEnum("comment_report_status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    reviewedBy: varchar("reviewed_by", { length: 21 }).references(
      () => users.id,
    ),
    reviewedAt: timestamp("reviewed_at"),
    actionTaken: actionTakenEnum("action_taken"),
  },
  (t) => ({
    reportStatusIdx: index("comment_report_status_idx").on(
      t.status,
      t.createdAt,
    ),
  }),
);

export type CommentReport = typeof commentReports.$inferSelect;
export type NewCommentReport = typeof commentReports.$inferInsert;

export const commentReportRelations = relations(commentReports, ({ one }) => ({
  comment: one(comments, {
    fields: [commentReports.commentId],
    references: [comments.commentId],
  }),
  reporter: one(users, {
    fields: [commentReports.reporterId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [commentReports.reviewedBy],
    references: [users.id],
  }),
}));

export const articleClaps = pgTable(
  "article_claps",
  {
    articleId: varchar("article_id").notNull(),
    userId: varchar("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },

  (table) => ({
    articleUserClapIdx: index("article_user_clap_idx").on(
      table.articleId,
      table.userId,
      table.createdAt,
    ),
    pk: primaryKey({ columns: [table.articleId, table.userId] }),
  }),
);

export type ArticleClap = typeof commentReports.$inferSelect;
export type NewArticleClap = typeof commentReports.$inferInsert;

export const savedArticles = pgTable(
  "saved_articles",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    userId: varchar("user_id", { length: 21 })
      .notNull()
      .references(() => users.id),
    articleId: varchar("article_id").notNull(),
    savedAt: timestamp("saved_at").defaultNow().notNull(),
  },
  (t) => ({
    userArticleIdx: index("user_article_idx").on(t.userId, t.articleId),
  }),
);

export type SavedArticle = typeof savedArticles.$inferSelect;
export type NewSavedArticle = typeof savedArticles.$inferInsert;

export const achievementStatusEnum = pgEnum("achievement_status", [
  "locked",
  "pending",
  "completed",
  "claimed",
]);

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    userId: varchar("user_id", { length: 21 })
      .notNull()
      .references(() => users.id),
    achievementId: varchar("achievement_id", { length: 3 }).notNull(),
    status: achievementStatusEnum("achievement_status")
      .notNull()
      .default("locked"),
    completedAt: timestamp("completed_at"),
    claimedAt: timestamp("claimed_at"),
  },
  (t) => ({
    userIdIdx: index("user_achievement_user_id_idx").on(t.userId),
    achievementIdIdx: index("user_achievement_achievement_id_idx").on(
      t.achievementId,
    ),
    userStatusIdx: index("user_achievement_status_idx").on(t.userId, t.status),
  }),
);

export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;

export const userAchievementsRelations = relations(
  userAchievements,
  ({ one }) => ({
    user: one(users, {
      fields: [userAchievements.userId],
      references: [users.id],
    }),
  }),
);

export const requestStatusEnum = pgEnum("request_status", [
  "pending",
  "verified",
  "rejected",
]);

export const followVerificationRequests = pgTable(
  "follow_verification_requests",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 21 })
      .notNull()
      .references(() => users.id),
    platformName: varchar("platform_name", { length: 50 }).notNull(),
    username: varchar("username", { length: 100 }).notNull(),
    requestDate: timestamp("request_date").notNull().defaultNow(),
    userAchievementId: varchar("user_achievement_id", { length: 21 })
      .notNull()
      .references(() => userAchievements.id),
    status: requestStatusEnum("request_status").notNull().default("pending"),
  },
  (t) => ({
    userStatusIdx: index("follow_verification_user_status_idx").on(
      t.userId,
      t.status,
      t.requestDate,
    ),
  }),
);

export type FollowVerificationRequest =
  typeof followVerificationRequests.$inferSelect;
export type NewFollowVerificationRequest =
  typeof followVerificationRequests.$inferInsert;

export const followVerificationRequestsRelations = relations(
  followVerificationRequests,
  ({ one }) => ({
    user: one(users, {
      fields: [followVerificationRequests.userId],
      references: [users.id],
    }),
    userAchievement: one(userAchievements, {
      fields: [followVerificationRequests.userAchievementId],
      references: [userAchievements.id],
    }),
  }),
);

export const savedArticlesRelations = relations(savedArticles, ({ one }) => ({
  user: one(users, {
    fields: [savedArticles.userId],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  achievements: many(userAchievements),
  followVerificationRequests: many(followVerificationRequests),
}));
