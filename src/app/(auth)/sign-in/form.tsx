import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPageForm() {
  return (
    <div className="mx-auto flex h-[500px] w-full flex-col justify-center space-y-6 sm:w-[350px] md:h-fit">
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
      <p className="text-sm text-muted-foreground">
        Enter your email below to login to your account
      </p>
    </div>
    <div className="grid gap-6">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <Button>
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/sign-in/github";
          }}
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/sign-in/google";
          }}
        >
          Google
        </Button>
      </div>
    </div>
    <p className="px-8 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <Link
        href="/policies/terms"
        className="underline underline-offset-4 hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/policies/privacy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
    </p>
  </div>
  )
}