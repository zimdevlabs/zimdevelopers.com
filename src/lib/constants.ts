export const APP_TITLE = "Zim Developers Labs";
export const DATABASE_PREFIX = "zimdevelopers";
export const TEST_DB_PREFIX = "test_zimdevelopers";
export const EMAIL_SENDER = '"Zim Developers Labs" <noreply@zimdevelopers.com>';

export enum Paths {
  Home = "/",
  Login = "/sign-in",
  Signup = "/sign-up",
  Dashboard = "/profile",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
}

export const ranks = [
  { name: "No Rank", minPoints: 0, maxPoints: 199 },
  { name: "New Comer 1", minPoints: 200, maxPoints: 560 },
  { name: "New Comer 2", minPoints: 561, maxPoints: 920 },
  { name: "New Comer 3", minPoints: 921, maxPoints: 1280 },
  { name: "New Comer 4", minPoints: 1281, maxPoints: 1640 },
  { name: "New Comer 5", minPoints: 1641, maxPoints: 1999 },
  { name: "Contributor 1", minPoints: 2000, maxPoints: 3000 },
  { name: "Contributor 2", minPoints: 3001, maxPoints: 4000 },
  { name: "Contributor 3", minPoints: 4001, maxPoints: 5000 },
  { name: "Contributor 4", minPoints: 5001, maxPoints: 6000 },
  { name: "Contributor 5", minPoints: 6001, maxPoints: 6999 },
  { name: "Leader 1", minPoints: 7000, maxPoints: 7600 },
  { name: "Leader 2", minPoints: 7601, maxPoints: 8200 },
  { name: "Leader 3", minPoints: 8201, maxPoints: 8800 },
  { name: "Leader 4", minPoints: 8801, maxPoints: 9400 },
  { name: "Leader 5", minPoints: 9401, maxPoints: 9999 },
  { name: "Ambassador 1", minPoints: 10000, maxPoints: 12000 },
  { name: "Ambassador 2", minPoints: 12001, maxPoints: 14000 },
  { name: "Ambassador 3", minPoints: 14001, maxPoints: 16000 },
  { name: "Ambassador 4", minPoints: 16001, maxPoints: 18000 },
  { name: "Ambassador 5", minPoints: 18001, maxPoints: 20000 },
];
