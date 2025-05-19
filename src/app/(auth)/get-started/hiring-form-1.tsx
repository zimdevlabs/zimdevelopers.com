import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

type HiringForm1Props = {
  prevStage: () => void;
  nextStage: () => void;
  setIsIndividual: (isIndividual: boolean) => void;
  isIndividual: boolean;
  companyName: string;
  setCompanyName: (companyName: string) => void;
};

export default function HiringForm1({
  prevStage,
  nextStage,
  companyName,
  isIndividual,
  setCompanyName,
  setIsIndividual,
}: HiringForm1Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Button
        variant="outline"
        onClick={prevStage}
        className="absolute top-4 left-4 cursor-pointer bg-zinc-100 px-8 text-zinc-800"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Change Profile Type
      </Button>
      <div className="px-8 pt-16">
        <div className="mx-auto mt-12 w-full lg:w-96">
          <div>
            <span className="mb-4 block text-xs text-zinc-600 md:text-sm">
              Step 1/2
            </span>
            <h1 className="mb-8 text-2xl">
              What&#39;s the name of your company
            </h1>
            <div className="space-y-8">
              <div>
                <Input
                  placeholder="Company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isIndividual}
                  className="h-14"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="individual"
                  checked={isIndividual}
                  onCheckedChange={(checked) => {
                    setIsIndividual(checked === true);
                  }}
                />
                <Label htmlFor="individual" className="text-base font-normal">
                  I&apos;m hiring as an individual
                </Label>
              </div>

              <Button
                className="h-12 w-32 rounded-full bg-zinc-800 text-zinc-100 hover:bg-zinc-900"
                disabled={!isIndividual && !companyName}
                onClick={() => {
                  nextStage();
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
