"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useActionState, useEffect } from "react";
import { login_with_email } from "../../actions";
import { toast } from "react-toastify";
import { SubmitButton } from "@/components/submit-button";

interface OTPFormProps {
  email: string;
  prevStage: () => void;
}

export function SignInOTP({ prevStage, email }: OTPFormProps) {
  const [state, formAction] = useActionState(login_with_email, null);

  useEffect(() => {
    if (state?.fieldError) {
      Object.values(state.fieldError).forEach((error) => {
        toast(error, {
          type: "error",
        });
      });
    }

    if (state?.done) {
      toast(state.successMessage, {
        type: "success",
      });
    }

    if (state?.formError) {
      toast(state.formError, {
        type: "error",
      });
    }
  }, [state]);

  return (
    <div className="mx-auto flex h-[500px] w-full flex-col justify-center space-y-6 sm:w-[350px] md:h-fit">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify its really you
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the one-time code sent to your email.
        </p>
      </div>
      <form
        action={formAction}
        className="flex w-full flex-col items-center space-y-6"
      >
        <input type="hidden" value={email} name="email" />
        <InputOTP maxLength={6} minLength={6} name="code" required>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        {state?.fieldError ? (
          <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
            {Object.values(state.fieldError).map((err) => (
              <li className="ml-4" key={err}>
                {err}
              </li>
            ))}
          </ul>
        ) : state?.formError ? (
          <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
            {state?.formError}
          </p>
        ) : null}
        <div className="flex w-full max-w-60 items-center justify-between space-x-2">
          <Button variant="outline" onClick={prevStage} className="w-full">
            Back
          </Button>
          <SubmitButton className="w-full" type="submit">
            Submit
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
