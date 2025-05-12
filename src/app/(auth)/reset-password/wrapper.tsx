"use client";

import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";

export default function SendResetEmailWrapper({
  callbackUrl,
}: {
  callbackUrl?: string;
}) {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="mb-4 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Your email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="email@example.com"
              autoComplete="email"
              className="focus:ring-primaryColor block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <SubmitButton
            type="submit"
            className="bg-primaryColor hover:bg-primaryColor/70 focus-visible:outline-primaryColor flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2"
          >
            Reset Password
          </SubmitButton>
        </div>
      </form>
      <div className="mb-4">
        <Link
          href="/sign-in"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = callbackUrl
              ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
              : "/sign-in";
          }}
          className="flex w-full justify-center rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm/6 text-zinc-600 shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-200"
        >
          Cancel
        </Link>
      </div>
      <div>
        <p className="mt-10 inline text-center text-sm/6 text-gray-500">
          Not signed up?{" "}
        </p>
        <Link
          href="/sign-up"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = callbackUrl
              ? `/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`
              : "/sign-up";
          }}
          className="text-primaryColor hover:text-primaryColor/70 inline text-sm/6 font-semibold"
          rel="nofollow"
        >
          Sign up now.
        </Link>
      </div>
    </div>
  );
}
