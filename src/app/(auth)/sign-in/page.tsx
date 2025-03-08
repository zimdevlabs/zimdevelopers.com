import { Metadata } from "next";
import SignInPageWrapper from "./wrapper";

export const metadata: Metadata = {
  title: "Sign In | Zim Developers Community",
  description: "Login to you zimdevelopers.com account to find developers for collaboration or hire.",
}

export default function SignInPage () {
  return (
    <SignInPageWrapper />
  )
}