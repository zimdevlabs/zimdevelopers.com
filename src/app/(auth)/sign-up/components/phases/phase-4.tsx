import { signup_with_email } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Phase4({
  setPhase,
  email,
  name,
  speciality,
}: {
  setPhase: Dispatch<SetStateAction<number>>;
  email: string;
  name: string;
  speciality: string;
}) {
  const [state, formAction] = useActionState(signup_with_email, null);

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
  }, [setPhase, state]);

  return (
    <div className="p-8">
      <div className="mx-auto h-[500px] md:h-fit flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="grid gap-6">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Confirm your details
          </h1>
          <form action={formAction}>
            <input type="hidden" value={name} name="name" />
            <input type="hidden" value={email} name="email" />
            <input type="hidden" value={speciality} name="speciality" />
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex justify-between bg-zinc-100 py-3 px-4 rounded-md">
                <div className="text-sm font-semibold">Name</div>
                <div className="text-sm ">{name}</div>
              </div>
              <div className="flex justify-between bg-zinc-100 py-3 px-4 rounded-md">
                <div className="text-sm font-semibold">Email</div>
                <div className="text-sm">{email}</div>
              </div>
              <div className="flex justify-between bg-zinc-100 py-3 px-4 rounded-md">
                <div className="text-sm font-semibold">Speciality</div>
                <div className="text-sm">{speciality}</div>
              </div>
            </div>
            <p className="mb-4 text-xs text-zinc-600">
              Details can also be changed in the settings
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setPhase(1)}
              >
                <ArrowLeft className="size-4 mt-0" />
                Go back
              </Button>
              <Button
                type="submit"
                className="w-full bg-primaryColor hover:bg-primaryColor/80"
              >
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
