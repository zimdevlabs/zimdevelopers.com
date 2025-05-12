"use client";

import { Icons } from "@/components/icons";
import { SubmitButton } from "@/components/submit-button";
import { signup } from "@/lib/auth/actions";
import {
  EnvelopeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignUpPageForm({
  callbackUrl,
}: {
  callbackUrl?: string;
}) {
  const [state, formAction] = useActionState(signup, null);

  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);

    if (state?.fieldError) {
      Object.values(state.fieldError).forEach((error) => {
        toast.error(error);
      });
    }
    if (state?.formError) {
      toast.error(state.formError);
    }
  }, [state, password]);

  const getStrengthColor = (index: number) => {
    if (passwordStrength >= index + 1) {
      if (passwordStrength === 1) return "bg-red-500";
      if (passwordStrength === 2) return "bg-yellow-500";
      return "bg-green-500";
    }
    return "bg-gray-200";
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-48">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Link href="/">
            <Icons.logoIcon className="h-10 w-fit" />
          </Link>
          <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
            Register new account
          </h2>
          {callbackUrl && (
            <div className="my-4 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-2 text-xs">
              <div className="mb-2 flex items-center gap-1">
                <InformationCircleIcon className="inline size-4" />
                <span className="block font-semibold">
                  After signup you will be redirected back to:
                </span>
              </div>
              <span className="line-clamp-1 block w-fit rounded-md border border-zinc-200 bg-zinc-100 px-2 py-1 text-xs">
                {callbackUrl.split("/")[callbackUrl.split("/").length - 1]}
              </span>
            </div>
          )}
          <p className="mt-2 text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = callbackUrl
                  ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
                  : "/sign-in";
              }}
              className="text-primaryColor hover:text-primaryColor/70 font-semibold"
            >
              Login now
            </Link>
          </p>
        </div>
        <div className="mt-10">
          <div className="mt-6 grid grid-cols-1">
            <Link
              href="/sign-in"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = callbackUrl
                  ? `/sign-in/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
                  : "/sign-in/google";
              }}
              prefetch={false}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-sm/6 font-semibold">Use Google</span>
            </Link>
            <Link
              href="/sign-in"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = callbackUrl
                  ? `/sign-in/github?callbackUrl=${encodeURIComponent(callbackUrl)}`
                  : "/sign-in/github";
              }}
              prefetch={false}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5 fill-[#24292F]"
              >
                <path
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              <span className="text-sm/6 font-semibold">Use GitHub</span>
            </Link>

            <button
              onClick={() => setShowEmail((prev) => !prev)}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <EnvelopeIcon className="h-5 w-fit" />
              <span className="text-sm/6 font-semibold">Use Email</span>
            </button>
          </div>
        </div>

        <div className={`mt-10 ${!showEmail ? "hidden" : "block"}`}>
          <div className="mb-6 w-full border-t border-gray-200" />
          <div>
            <form action={formAction} className="space-y-6">
              <input
                type="hidden"
                name="callbackUrl"
                value={callbackUrl ? callbackUrl : undefined}
              />
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="focus:ring-primaryColor block w-full rounded-sm border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="focus:ring-primaryColor block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:ring-primaryColor block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  />
                  <div
                    className="absolute top-0 right-0 cursor-pointer pt-2 pr-4"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </div>
                </div>
                <div className="mt-2 flex space-x-1">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-1 w-1/4 rounded-full transition-all duration-300 ${getStrengthColor(index)}`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {passwordStrength < 2 && "Password is too weak"}
                  {passwordStrength === 2 && "Password strength is moderate"}
                  {passwordStrength > 2 && "Password is strong"}
                </p>
              </div>
              <div>
                <SubmitButton
                  disabled={passwordStrength < 3}
                  type="submit"
                  className="bg-primaryColor hover:bg-primaryColor/70 focus-visible:outline-primaryColor flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2"
                >
                  Sign up
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
        <div className="my-6 w-full border-t border-gray-200" />

        <p className="mt-4 text-sm text-gray-600">
          By continuing, you confirm you are 16 or over and agree to our{" "}
          <Link href="/policies/privacy" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="policies/terms" className="underline">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
