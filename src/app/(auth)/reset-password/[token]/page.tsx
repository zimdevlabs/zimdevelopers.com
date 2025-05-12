import { Icons } from "@/components/icons";
import ResetPasswordWrapper from "./wrapper";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
  title: "Reset Password",
  description: "Reset Password Page",
};

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function ResetPasswordPage({
  params,
  searchParams,
}: Props) {
  const { token } = await params;
  const { callbackUrl } = await searchParams;
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto mt-12 mb-8 w-fit">
            <Link href="/">
              <Icons.logoIcon className="h-16 w-fit" />
            </Link>
            <small className="text-xs text-gray-600">By XFINITY PROS</small>
          </div>
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Reset password
          </h2>
          {callbackUrl && (
            <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-2 text-xs">
              <div className="mb-2 flex items-center gap-1">
                <InformationCircleIcon className="inline size-4" />
                <span className="block font-semibold">
                  After reset you will be redirected back to:
                </span>
              </div>
              <span className="line-clamp-1 block w-fit rounded-md border border-zinc-200 bg-zinc-100 px-2 py-1 text-xs">
                {callbackUrl.split("/")[callbackUrl.split("/").length - 1]}
              </span>
            </div>
          )}
        </div>

        <ResetPasswordWrapper token={token} callbackUrl={callbackUrl} />
      </div>
    </>
  );
}
