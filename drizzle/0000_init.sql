CREATE TYPE "public"."achievement_status" AS ENUM('locked', 'pending', 'completed', 'claimed');--> statement-breakpoint
CREATE TYPE "public"."action_taken" AS ENUM('none', 'hidden', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."comment_report_status" AS ENUM('pending', 'reviewed', 'resolved');--> statement-breakpoint
CREATE TABLE "zd_article_claps" (
	"article_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "zd_article_claps_article_id_user_id_pk" PRIMARY KEY("article_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "zd_comment_reactions" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"comment_id" varchar(21) NOT NULL,
	"reaction" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zd_comment_reports" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"comment_id" varchar(21) NOT NULL,
	"reporter_id" varchar(21) NOT NULL,
	"reason" varchar NOT NULL,
	"comment_report_status" "comment_report_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_by" varchar(21),
	"reviewed_at" timestamp,
	"action_taken" "action_taken"
);
--> statement-breakpoint
CREATE TABLE "zd_comments" (
	"comment_id" varchar(21) PRIMARY KEY NOT NULL,
	"article_id" varchar(50) NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"comment_text" text NOT NULL,
	"parent_comment_id" varchar(21),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"likes_count" integer DEFAULT 0 NOT NULL,
	"dislikes_count" integer DEFAULT 0 NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "zd_email_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(8) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "zd_email_verification_codes_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "zd_follow_verification_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"platform_name" varchar(50) NOT NULL,
	"username" varchar(100) NOT NULL,
	"request_date" timestamp DEFAULT now() NOT NULL,
	"user_achievement_id" varchar(21) NOT NULL,
	"request_status" "request_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zd_password_reset_tokens" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zd_saved_articles" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"article_id" varchar NOT NULL,
	"saved_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zd_sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zd_user_achievements" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"achievement_id" varchar(3) NOT NULL,
	"achievement_status" "achievement_status" DEFAULT 'locked' NOT NULL,
	"completed_at" timestamp,
	"claimed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "zd_users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"google_id" varchar(21),
	"github_id" varchar(21),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"hashed_password" varchar(255),
	"avatar" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"full_name" varchar(32) NOT NULL,
	"username" varchar(48) NOT NULL,
	"country" varchar(60),
	"city" varchar(32),
	"dev_profile_completed" boolean DEFAULT false,
	"emp_profile_completed" boolean DEFAULT false,
	"total_points" integer DEFAULT 0 NOT NULL,
	"role" varchar(8),
	"communication_settings" jsonb DEFAULT '{"preferences":{"ads":false,"account":false,"notifications":false}}'::jsonb,
	"tier_id" varchar(15),
	"current_period_end" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "zd_users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "zd_users_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "zd_users_email_unique" UNIQUE("email"),
	CONSTRAINT "zd_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "zd_comment_reports" ADD CONSTRAINT "zd_comment_reports_comment_id_zd_comments_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."zd_comments"("comment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zd_comment_reports" ADD CONSTRAINT "zd_comment_reports_reporter_id_zd_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."zd_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zd_comment_reports" ADD CONSTRAINT "zd_comment_reports_reviewed_by_zd_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."zd_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zd_follow_verification_requests" ADD CONSTRAINT "zd_follow_verification_requests_user_id_zd_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."zd_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zd_follow_verification_requests" ADD CONSTRAINT "zd_follow_verification_requests_user_achievement_id_zd_user_achievements_id_fk" FOREIGN KEY ("user_achievement_id") REFERENCES "public"."zd_user_achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zd_saved_articles" ADD CONSTRAINT "zd_saved_articles_user_id_zd_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."zd_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zd_user_achievements" ADD CONSTRAINT "zd_user_achievements_user_id_zd_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."zd_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "article_user_clap_idx" ON "zd_article_claps" USING btree ("article_id","user_id","created_at");--> statement-breakpoint
CREATE INDEX "comment_reaction_comment_idx" ON "zd_comment_reactions" USING btree ("comment_id");--> statement-breakpoint
CREATE INDEX "comment_reaction_user_idx" ON "zd_comment_reactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_comment_reaction_idx" ON "zd_comment_reactions" USING btree ("user_id","comment_id","reaction");--> statement-breakpoint
CREATE INDEX "comment_report_status_idx" ON "zd_comment_reports" USING btree ("comment_report_status","created_at");--> statement-breakpoint
CREATE INDEX "comment_article_idx" ON "zd_comments" USING btree ("article_id");--> statement-breakpoint
CREATE INDEX "comment_user_idx" ON "zd_comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "comment_parent_comment_idx" ON "zd_comments" USING btree ("parent_comment_id");--> statement-breakpoint
CREATE INDEX "comment_article_user_idx" ON "zd_comments" USING btree ("article_id","user_id");--> statement-breakpoint
CREATE INDEX "verification_code_user_idx" ON "zd_email_verification_codes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_code_email_idx" ON "zd_email_verification_codes" USING btree ("email");--> statement-breakpoint
CREATE INDEX "follow_verification_user_status_idx" ON "zd_follow_verification_requests" USING btree ("user_id","request_status","request_date");--> statement-breakpoint
CREATE INDEX "password_token_user_idx" ON "zd_password_reset_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_article_idx" ON "zd_saved_articles" USING btree ("user_id","article_id");--> statement-breakpoint
CREATE INDEX "session_user_idx" ON "zd_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_achievement_user_id_idx" ON "zd_user_achievements" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_achievement_achievement_id_idx" ON "zd_user_achievements" USING btree ("achievement_id");--> statement-breakpoint
CREATE INDEX "user_achievement_status_idx" ON "zd_user_achievements" USING btree ("user_id","achievement_status");--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "zd_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "user_google_idx" ON "zd_users" USING btree ("google_id");--> statement-breakpoint
CREATE INDEX "user_github_idx" ON "zd_users" USING btree ("github_id");