"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, countryCodes } from "@/lib/constants";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronLeft, Linkedin, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

type HiringFormProps = {
  prevStage: () => void;
  isIndividual: boolean;
  companyName: string;
};

export default function HiringForm2({
  prevStage,
  companyName,
  isIndividual,
}: HiringFormProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Button
        variant="outline"
        onClick={prevStage}
        className="absolute top-4 left-4 cursor-pointer bg-zinc-100 px-8 text-zinc-800"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="px-8 pt-16">
        <div className="mx-auto mt-12 w-full lg:w-96">
          {isIndividual && <IndividualHiring />}
          {companyName && !isIndividual && (
            <CompanyHiring companyName={companyName} />
          )}
        </div>
      </div>
    </div>
  );
}

function IndividualHiring() {
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodes[0],
  );
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all spaces from the input
    const cleaned = e.target.value.replace(/\s/g, "");

    // Only allow numbers, +, -, and ()
    const valid = cleaned.replace(/[^\d+()-]/g, "");

    setPhoneNumber(valid);
  };

  const [photo, setPhoto] = useState<string | null>(
    "/placeholder.svg?height=120&width=120",
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <span className="mb-4 block text-xs text-zinc-600 md:text-sm">
        Step 2/2
      </span>
      <h1 className="mb-8 text-2xl">What do you do?</h1>
      <p className="mb-4 text-zinc-600">
        Set up your profile for this workspace.
      </p>
      <div className="mb-8 space-y-8">
        <div>
          <div className="relative">
            <Input className="h-14" placeholder="Professional Title" />
          </div>
        </div>
        <div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <Linkedin className="h-5 w-5 text-zinc-500" />
            </div>
            <Input className="h-14 pl-10" placeholder="LinkedIn URL" />
          </div>
        </div>
        <div>
          <p className="mb-4 text-zinc-600">Add your business phone number.</p>
          <div className="relative rounded-md">
            <Listbox
              value={selectedCountryCode}
              onChange={setSelectedCountryCode}
            >
              <div className="absolute inset-y-0 left-0">
                <ListboxButton className="flex h-full items-center gap-2 rounded-l-md border-0 py-0 pr-4 pl-3 text-gray-500 outline-none sm:text-sm">
                  <ReactCountryFlag
                    countryCode={selectedCountryCode!.code}
                    svg
                  />
                  <span>{selectedCountryCode!.code}</span>
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute top-full left-0 z-10 mt-1 max-h-60 w-56 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
                >
                  {countryCodes.slice(0, 2).map((country) => (
                    <ListboxOption
                      key={country.code}
                      value={country}
                      className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      <ReactCountryFlag countryCode={country.code} svg />
                      <span>{country.name}</span>
                      <span className="ml-auto text-gray-500">
                        {country.dialCode}
                      </span>
                    </ListboxOption>
                  ))}
                  <div className="h-[1px] w-full bg-gray-200"></div>
                  {countryCodes.slice(2).map((country) => (
                    <ListboxOption
                      key={country.code}
                      value={country}
                      className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      <ReactCountryFlag countryCode={country.code} svg />
                      <span>{country.name}</span>
                      <span className="ml-auto text-gray-500">
                        {country.dialCode}
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="+263 78 765 4321"
              className="block h-14 w-full rounded-md border border-gray-200 py-2 pl-24 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            />
          </div>
          <div className="mt-2 text-xs text-zinc-600">Optional</div>
        </div>
        <div>
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                {photo ? (
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    height={96}
                    width={96}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <span className="text-gray-400">Photo</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                Profile photo
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Add a photo of yourself to help build connection and trust.
              </p>

              <label
                htmlFor="photo-upload"
                className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-sm border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw size={16} />
                Replace profile photo
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Button className="rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800">
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}

function CompanyHiring({ companyName }: { companyName: string }) {
  const [oneLiner, setOneLiner] = useState("");
  const maxChars = 160;
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [photo, setPhoto] = useState<string | null>(
    "/placeholder.svg?height=120&width=120",
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <span className="mb-4 block text-xs text-zinc-600 md:text-sm">
        Step 2/2
      </span>
      <h1 className="mb-8 text-2xl">Create your company workspace</h1>
      <p className="mb-4 text-zinc-600">
        Fill in some details about your company/hiring workspace
      </p>
      <div className="mb-8 space-y-8">
        <div>
          <div className="relative">
            <Input
              className="h-14"
              placeholder="Company Name"
              value={companyName}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="one-liner"
            className="block text-sm font-medium text-gray-700"
          >
            Company Description
          </label>
          <div className="relative">
            <textarea
              id="one-liner"
              value={oneLiner}
              onChange={(e) => setOneLiner(e.target.value.slice(0, maxChars))}
              placeholder="Highlight your company focus."
              className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 p-3 placeholder:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              maxLength={maxChars}
            />
            <div className="absolute right-2 bottom-2 text-xs text-gray-500">
              {oneLiner.length}/{maxChars}
            </div>
          </div>
        </div>
        <div>
          <div className="relative">
            <Input className="h-14" placeholder="Company URL" />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="one-liner"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="w-full py-7">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Input
                id="city"
                className="h-14"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
              {photo ? (
                <Image
                  height={48}
                  width={48}
                  src={photo || "/placeholder.svg"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <span className="text-gray-400">Photo</span>
                </div>
              )}
            </div>
          </div>
          <label
            htmlFor="photo-upload"
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Upload size={16} />
            Upload company logo
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Button className="rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800">
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
