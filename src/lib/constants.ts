import { siteConfigType } from "@/types";

export const APP_TITLE = "Zim Developers Labs";
export const DATABASE_PREFIX = "zd";
export const TEST_DB_PREFIX = "test_zd";
export const EMAIL_SENDER = '"Zim Developers Labs" <noreply@zimdevelopers.com>';

export enum Paths {
  Home = "/",
  Login = "/sign-in",
  Signup = "/sign-up",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
  GetStarted = "/get-started",
}

export const siteConfig: siteConfigType = {
  name: "Zim Developers Community",
  shortName: "Zim Developers",
  twitterUsername: "@zimdevlabs",
  url: {
    logo: "https://www.zimdevelopers.com/apple-touch-icon.png",
    web: "https://www.zimdevelopers.com",
    linkedin: "https://www.linkedin.com/company/zimdevlabs",
    github: "https://github.com/orgs/zimdevlabs/repositories",
    banner: "https://www.zimdevelopers.com/banner.webp",
  },
}
