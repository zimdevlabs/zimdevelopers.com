"use client";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/constants";
import {
  create_employer_profile,
  updateAvatarUrl,
} from "@/lib/profiles/actions";
import { ChevronLeft, LinkIcon, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import ImageCropModal from "./crop-modal";

type TypeHiringProps = {
  userId: string;
  photoUrl: string;
  setPhotoUrl: (photoUrl: string) => void;
  companyName?: string;
};

type HiringFormProps = TypeHiringProps & {
  prevStage: () => void;
  isIndividual: boolean;
};

export default function HiringForm2({
  prevStage,
  companyName,
  isIndividual,
  photoUrl,
  setPhotoUrl,
  userId,
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
          {isIndividual && (
            <IndividualHiring
              type="individual"
              photoUrl={photoUrl}
              userId={userId}
              setPhotoUrl={setPhotoUrl}
            />
          )}
          {companyName && !isIndividual && (
            <CompanyHiring
              setPhotoUrl={setPhotoUrl}
              companyName={companyName}
              photoUrl={photoUrl}
              type="company"
              userId={userId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type IndividualHiringProps = {
  type: string;
  photoUrl: string;
  userId: string;
  setPhotoUrl: (photoUrl: string) => void;
};

function IndividualHiring({
  type,
  photoUrl,
  setPhotoUrl,
  userId,
}: IndividualHiringProps) {
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [city, setCity] = useState("");

  // avatar

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFileType = (file: File) => {
    const validTypes = ["image/png", "image/webp", "image/jpeg", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only PNG, WebP, JPEG, and GIF files are allowed");
      return false;
    }
    return true;
  };

  const uploadAvatar = async (croppedImageBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", croppedImageBlob, "avatar.png");
    formData.append("userId", userId);

    setProgress(0);
    setIsUploading(true);
    try {
      const response = await fetch(
        `/api/upload?filename=${userId}-avatar.png`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        toast.error("Upload failed");
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setPhotoUrl(data.url);
      updateAvatarUrl(data.url, userId);

      toast.success("Avatar uploaded successfuly.");
      setProgress(100);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar. Please try again.");
    }
    setIsUploading(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("we are here");
    if (file) {
      if (!validateFileType(file)) {
        return;
      }

      if (file.size > 1024 * 1024) {
        toast(
          "File size must be less than 1MB. Crop or use an image compressor",
          {
            action: {
              label: "Compress",
              onClick: () =>
                window.open(
                  "https://www.iloveimg.com/compress-image",
                  "_blank",
                ),
            },
          },
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const [state, formAction] = useActionState(create_employer_profile, null);

  useEffect(() => {
    if (state?.fieldError) {
      Object.values(state.fieldError).forEach((error) => {
        toast.error(error);
      });
    }

    if (state?.done) {
      toast.success(state.successMessage);
    }

    if (state?.formError) {
      toast.error(state.formError);
    }
  }, [state]);

  return (
    <div>
      <span className="mb-4 block text-xs text-zinc-600 md:text-sm">
        Step 2/2
      </span>
      <h1 className="mb-8 text-2xl">Hiring profile setup?</h1>
      <p className="mb-4 text-zinc-600">
        Set up your profile for this workspace.
      </p>
      <form action={formAction} className="mb-8 space-y-8">
        <input type="hidden" value={userId} name="userId" />
        <input type="hidden" value={type} name="type" />
        <input type="hidden" value={photoUrl} name="avatar" />
        <div>
          <div className="relative">
            <Input
              className="h-14"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              placeholder="Professional Title"
            />
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <LinkIcon className="h-5 w-5 text-zinc-500" />
          </div>
          <Input
            className="h-14 pl-10"
            required
            name="socialLink"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
            type="url"
            placeholder="Linkedin, X, Instagram, etc."
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Select name="country" value={country} onValueChange={setCountry}>
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
                name="city"
                className="h-14"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src={photoUrl || "/placeholder.svg"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  height={96}
                  width={96}
                />
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
        {state?.fieldError ? (
          <ul className="bg-destructive/10 text-destructive list-disc space-y-1 rounded-lg border p-2 text-[0.8rem] font-medium">
            {Object.values(state.fieldError).map((err, i) => (
              <li className="ml-4" key={i}>
                {err}
              </li>
            ))}
          </ul>
        ) : state?.formError ? (
          <p className="bg-destructive/10 text-destructive rounded-lg border p-2 text-[0.8rem] font-medium">
            {state?.formError}
          </p>
        ) : null}
        <div className="my-8 flex items-center justify-center">
          <SubmitButton
            disabled={!country || !city || !photoUrl}
            className="rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800"
          >
            Complete
          </SubmitButton>
        </div>
      </form>
      {isModalOpen && selectedImage && (
        <ImageCropModal
          isUploading={isUploading}
          progress={progress}
          imageUrl={selectedImage}
          onClose={() => setIsModalOpen(false)}
          onSave={(croppedImage) => {
            fetch(croppedImage)
              .then((res) => res.blob())
              .then((blob) => uploadAvatar(blob))
              .then(() => setIsModalOpen(false))
              .catch((error) => {
                console.error("Error processing cropped image:", error);
                alert("Failed to process the cropped image. Please try again.");
              });
          }}
        />
      )}
    </div>
  );
}

type CompanyHiringProps = {
  type: string;
  photoUrl: string;
  userId: string;
  companyName: string;
  setPhotoUrl: (photoUrl: string) => void;
};

function CompanyHiring({
  companyName,
  photoUrl,
  type,
  userId,
  setPhotoUrl,
}: CompanyHiringProps) {
  const maxChars = 160;
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [socialLink, setSocialLink] = useState("");

  // avatar

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFileType = (file: File) => {
    const validTypes = ["image/png", "image/webp", "image/jpeg", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only PNG, WebP, JPEG, and GIF files are allowed");
      return false;
    }
    return true;
  };

  const uploadAvatar = async (croppedImageBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", croppedImageBlob, "avatar.png");
    formData.append("userId", userId);

    setProgress(0);
    setIsUploading(true);
    try {
      const response = await fetch(
        `/api/upload?filename=${userId}-avatar.png`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        toast.error("Upload failed");
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setPhotoUrl(data.url);
      updateAvatarUrl(data.url, userId);

      toast.success("Avatar uploaded successfuly.");
      setProgress(100);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar. Please try again.");
    }
    setIsUploading(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("we are here");
    if (file) {
      if (!validateFileType(file)) {
        return;
      }

      if (file.size > 1024 * 1024) {
        toast(
          "File size must be less than 1MB. Crop or use an image compressor",
          {
            action: {
              label: "Compress",
              onClick: () =>
                window.open(
                  "https://www.iloveimg.com/compress-image",
                  "_blank",
                ),
            },
          },
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const [state, formAction] = useActionState(create_employer_profile, null);

  useEffect(() => {
    if (state?.fieldError) {
      Object.values(state.fieldError).forEach((error) => {
        toast.error(error);
      });
    }

    if (state?.done) {
      toast.success(state.successMessage);
    }

    if (state?.formError) {
      toast.error(state.formError);
    }
  }, [state]);

  return (
    <div>
      <span className="mb-4 block text-xs text-zinc-600 md:text-sm">
        Step 2/2
      </span>
      <h1 className="mb-8 text-2xl">Create your company workspace</h1>
      <p className="mb-4 text-zinc-600">
        Fill in some details about your company/hiring workspace
      </p>
      <form action={formAction} className="mb-8 space-y-8">
        <input type="hidden" value={userId} name="userId" />
        <input type="hidden" value={type} name="type" />
        <input type="hidden" value={photoUrl} name="avatar" />
        <div>
          <div className="relative">
            <Input
              className="h-14"
              placeholder="Company Name"
              value={companyName}
              name="companyName"
              readOnly
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Company Description
          </label>
          <div className="relative">
            <textarea
              id="bio"
              value={bio}
              name="bio"
              onChange={(e) => setBio(e.target.value.slice(0, maxChars))}
              placeholder="Highlight your company focus."
              className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 p-3 placeholder:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              maxLength={maxChars}
            />
            <div className="absolute right-2 bottom-2 text-xs text-gray-500">
              {bio.length}/{maxChars}
            </div>
          </div>
        </div>
        <div>
          <div className="relative">
            <Input
              className="h-14"
              placeholder="Company URL"
              type="url"
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              name="socialLink"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Select name="country" value={country} onValueChange={setCountry}>
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
                name="city"
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
              <Image
                height={48}
                width={48}
                src={photoUrl || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
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
        {state?.fieldError ? (
          <ul className="bg-destructive/10 text-destructive list-disc space-y-1 rounded-lg border p-2 text-[0.8rem] font-medium">
            {Object.values(state.fieldError).map((err, i) => (
              <li className="ml-4" key={i}>
                {err}
              </li>
            ))}
          </ul>
        ) : state?.formError ? (
          <p className="bg-destructive/10 text-destructive rounded-lg border p-2 text-[0.8rem] font-medium">
            {state?.formError}
          </p>
        ) : null}
        <div className="my-8 flex items-center justify-center">
          <SubmitButton
            disabled={!bio || !socialLink || !country || !city}
            className="rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800"
          >
            Complete
          </SubmitButton>
        </div>
      </form>
      {isModalOpen && selectedImage && (
        <ImageCropModal
          isUploading={isUploading}
          progress={progress}
          imageUrl={selectedImage}
          onClose={() => setIsModalOpen(false)}
          onSave={(croppedImage) => {
            fetch(croppedImage)
              .then((res) => res.blob())
              .then((blob) => uploadAvatar(blob))
              .then(() => setIsModalOpen(false))
              .catch((error) => {
                console.error("Error processing cropped image:", error);
                alert("Failed to process the cropped image. Please try again.");
              });
          }}
        />
      )}
    </div>
  );
}
