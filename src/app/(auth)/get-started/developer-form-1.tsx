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
import { countries } from "@/lib/constants";
import { updateAvatarUrl } from "@/lib/profiles/actions";
import { ChevronLeft, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ImageCropModal from "./crop-modal";

type DeveloperForm1Props = {
  prevStage: () => void;
  nextStage: () => void;
  bio: string;
  setBio: (bio: string) => void;
  skills: string[];
  setSkills: (skills: string[]) => void;
  country: string;
  setCountry: (country: string) => void;
  city: string;
  setCity: (city: string) => void;
  photoUrl: string;
  setPhotoUrl: (photoUrl: string) => void;
  userId: string;
};

// Sample skill suggestions
const allSkills = [
  "Frontend Engineer",
  "Backend Developer",
  "UI Designer",
  "UX Designer",
  "Brand Designer",
  "Copywriter",
  "Project Manager",
  "Full Stack Developer",
  "DevOps Engineer",
  "Product Manager",
];

export default function DeveloperForm1({
  nextStage,
  prevStage,
  bio,
  setBio,
  skills,
  setSkills,
  country,
  setCountry,
  city,
  setCity,
  photoUrl,
  setPhotoUrl,
  userId,
}: DeveloperForm1Props) {
  const maxChars = 60;
  // Skills state
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const maxSkills = 3;

  // Filter suggestions based on input
  useEffect(() => {
    if (skillInput.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allSkills
      .filter(
        (skill) =>
          skill.toLowerCase().includes(skillInput.toLowerCase()) &&
          !skills.includes(skill),
      )
      .slice(0, 5); // Limit suggestions

    setSuggestions(filtered);
  }, [skillInput, skills, allSkills]);

  // Handle adding a skill
  const addSkill = (skill: string) => {
    if (
      skills.length < maxSkills &&
      !skills.includes(skill) &&
      skill.trim() !== ""
    ) {
      setSkills([...skills, skill]);
      setSkillInput("");
      setSuggestions([]);
    }
  };

  // Handle removing a skill
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Handle skill input keydown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput) {
      e.preventDefault();
      if (suggestions.length > 0) {
        addSkill(suggestions[0]);
      } else {
        addSkill(skillInput);
      }
    }
  };

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
            <h1 className="mb-8 text-2xl">Developer Profile Setup</h1>
            <div className="space-y-8">
              {/* One-liner input */}
              <div className="space-y-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <div className="relative">
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, maxChars))}
                    placeholder="Highlight your creative focus."
                    className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 p-3 placeholder:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    maxLength={maxChars}
                  />
                  <div className="absolute right-2 bottom-2 text-xs text-gray-500">
                    {bio.length}/{maxChars}
                  </div>
                </div>
              </div>

              {/* Skills input */}
              <div className="space-y-2">
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills
                </label>
                <div className="relative">
                  <div className="flex min-h-[56px] flex-wrap gap-2 rounded-lg border border-gray-300 p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
                    {/* Skill tags */}
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}

                    {/* Input field (only shown if under max skills) */}
                    {skills.length < maxSkills && (
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                          skills.length === 0 ? "Add up to 3 skills." : ""
                        }
                        className="min-w-[120px] flex-grow bg-transparent outline-none placeholder:text-sm"
                      />
                    )}
                  </div>

                  {/* Suggestions dropdown */}
                  {suggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                      <ul>
                        {suggestions.map((suggestion) => (
                          <li
                            key={suggestion}
                            onClick={() => addSkill(suggestion)}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills count */}
                  <div className="absolute right-2 bottom-2 text-xs text-gray-500">
                    {skills.length}/{maxSkills}
                  </div>
                </div>
              </div>

              {/* Location */}
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

              {/* Profile Picture */}
              <div className="space-y-2">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src={
                          photoUrl || "/placeholder.svg?height=120&width=120"
                        }
                        alt="Profile"
                        className="h-full w-full object-cover"
                        width={96}
                        height={96}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      Profile photo
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Add a photo of yourself to help build connection and
                      trust.
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

              <div className="mb-8 flex w-full items-center">
                <Button
                  className="mx-auto px-10"
                  disabled={
                    skills.length < 1 ||
                    bio.length < 1 ||
                    !country ||
                    !city ||
                    photoUrl.length < 1
                  }
                  onClick={() => {
                    if (skills.length > 0 && bio.length > 0) {
                      nextStage();
                    }
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
