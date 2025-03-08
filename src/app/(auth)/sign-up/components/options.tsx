"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function UserDescriptionSelector() {
  const [planType, setPlanType] = useState("personal")

  return (
    <div className="w-full max-w-md">
      <h2 className="text-sm font-normal text-gray-600 mb-2">Which options best describe you:</h2>
      <RadioGroup value={planType} onValueChange={setPlanType} className="border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="personal"
              id="personal"
              className="h-5 w-5 border-2 text-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label htmlFor="personal" className="text-base font-normal">
              UX/UX Designer
            </Label>
          </div>
          <div className="bg-gray-400 text-white text-xs font-medium px-3 py-1 rounded-full">Hobby</div>
        </div>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="commercial"
              id="commercial"
              className="h-5 w-5 border-2 text-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label htmlFor="commercial" className="text-base font-normal">
              Programmer
            </Label>
          </div>
          toggle to describe category
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="recruiter"
              id="recruiter"
              className="h-5 w-5 border-2 text-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label htmlFor="recruiter" className="text-base font-normal">
              Recruiter
            </Label>
          </div>
          <div className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">Pro</div>
        </div>
      </RadioGroup>
    </div>
  )
}

