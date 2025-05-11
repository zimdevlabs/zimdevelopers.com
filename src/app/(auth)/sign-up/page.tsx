import { Metadata } from "next";
import SignUpPageWrapper from "./wrapper";

export const metadata: Metadata = {
  title: "Sign Up | Zim Developers Community",
  description: "Create a free account to join the Zim Developers Community.",
}

export default function SignUpPage () {
  return (
    <SignUpPageWrapper />
  )
}