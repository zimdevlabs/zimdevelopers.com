"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  verifyEmail,
  resendVerificationEmail as resendEmail,
  logout,
} from "@/lib/auth/actions";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";

export default function VerifyCode({ callbackUrl }: { callbackUrl?: string }) {
  const [verifyEmailState, verifyEmailAction] = useActionState(
    verifyEmail,
    null,
  );
  const [resendState, resendAction] = useActionState(resendEmail, null);
  const codeFormRef = useRef<HTMLFormElement>(null);
  const [code, setCode] = useState(Array(8).fill(""));

  useEffect(() => {
    if (resendState?.success) {
      toast.success("Email sent!");
    }
    if (resendState?.error) {
      toast.error(resendState.error);
    }
  }, [resendState?.error, resendState?.success]);

  useEffect(() => {
    if (verifyEmailState?.error) {
      toast.error(verifyEmailState.error);
    }
  }, [verifyEmailState?.error]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input
      if (value !== "" && index < 7) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && code[index] === "") {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        const prevInput = document.getElementById(`code-${index - 1}`);
        prevInput?.focus();
      } else if (code[index] !== "") {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    } else if (e.key === "Delete" && index < 7) {
      const newCode = [...code];
      newCode[index + 1] = "";
      setCode(newCode);
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === "ArrowRight" && index < 7) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^\d]/g, "")
      .slice(0, 8);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus on the next empty input or the last input if all are filled
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const nextInputId =
      nextEmptyIndex === -1 ? "code-7" : `code-${nextEmptyIndex}`;
    document.getElementById(nextInputId)?.focus();
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.info("Signed out successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        ref={codeFormRef}
        action={verifyEmailAction}
        className="mb-4 space-y-6"
      >
        <input
          type="hidden"
          name="callbackUrl"
          value={callbackUrl ? callbackUrl : undefined}
        />
        <input type="hidden" name="code" id="code" value={code.join("")} />
        <div>
          <label
            htmlFor="code"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Verification Code
          </label>
          <div className="mt-2 flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                name={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                required
                className="focus:ring-primaryColor h-12 w-10 rounded-md border-0 text-center text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-lg/6"
              />
            ))}
          </div>
        </div>

        <div>
          <SubmitButton
            type="submit"
            className="bg-primaryColor hover:bg-primaryColor/70 focus-visible:outline-primaryColor flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2"
          >
            Verify
          </SubmitButton>
        </div>
      </form>
      <form className="mb-4" action={resendAction}>
        <SubmitButton
          type="submit"
          className="flex w-full justify-center rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-sm/6 text-zinc-600 shadow-sm hover:bg-zinc-100"
        >
          Resend Code
        </SubmitButton>
      </form>
      <div>
        <p className="mt-10 inline text-center text-sm/6 text-gray-500">
          Want to use another email?{" "}
        </p>
        <button
          className="text-primaryColor hover:text-primaryColor/70 inline font-semibold"
          onClick={handleSignout}
          disabled={isLoading}
        >
          {isLoading ? "Processing" : "Logout Now"}
        </button>
      </div>
    </div>
  );
}
