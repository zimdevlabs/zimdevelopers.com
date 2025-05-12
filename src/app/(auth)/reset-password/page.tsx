import SendResetEmailWrapper from "./wrapper";

export const metadata = {
  title: "Reset Password",
  description: "Reset Password Page",
};

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-20 text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-8">
            Forgot password?
          </h2>
          <p>Password reset link will be sent to your email.</p>
        </div>

        <SendResetEmailWrapper callbackUrl={callbackUrl} />
      </div>
    </>
  );
}
