"use client";

import { useState } from "react";
import PathsCards from "./paths";
import { Icons } from "@/components/icons";
import HiringForm2 from "./hiring-form-2";
import DeveloperForm2 from "./developer-form-2";
import HiringForm1 from "./hiring-form-1";
import DeveloperForm1 from "./developer-form-1";
import { User } from "lucia";

export default function GetStartedWrapper({ user }: { user: User }) {
  const [currentStage, setCurrentStage] = useState(1);
  const [isHiring, setIsHiring] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const totalStages = 3;
  const [isIndividual, setIsIndividual] = useState(false);
  const [companyName, setCompanyName] = useState("");

  // States for Developer Form1

  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user.avatar || "");

  const nextStage = () => {
    if (currentStage < totalStages) {
      setCurrentStage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <PathsCards
            isDeveloper={isDeveloper}
            isHiring={isHiring}
            nextStage={nextStage}
            setIsDeveloper={setIsDeveloper}
            setIsHiring={setIsHiring}
          />
        );
      case 2:
        if (isHiring) {
          return (
            <HiringForm1
              companyName={companyName}
              isIndividual={isIndividual}
              setCompanyName={setCompanyName}
              setIsIndividual={setIsIndividual}
              prevStage={prevStage}
              nextStage={nextStage}
            />
          );
        }
        if (isDeveloper) {
          return (
            <DeveloperForm1
              userId={user.id}
              prevStage={prevStage}
              nextStage={nextStage}
              bio={bio}
              city={city}
              country={country}
              skills={skills}
              setBio={setBio}
              setCity={setCity}
              setCountry={setCountry}
              setSkills={setSkills}
              setPhotoUrl={setPhotoUrl}
              photoUrl={photoUrl}
            />
          );
        }

      case 3:
        if (isHiring) {
          return (
            <HiringForm2
              setPhotoUrl={setPhotoUrl}
              photoUrl={photoUrl}
              userId={user.id}
              companyName={companyName}
              isIndividual={isIndividual}
              prevStage={prevStage}
            />
          );
        }
        if (isDeveloper) {
          return (
            <DeveloperForm2
              prevStage={prevStage}
              photoUrl={photoUrl}
              bio={bio}
              city={city}
              country={country}
              skills={skills}
              userId={user.id}
            />
          );
        }
    }
  };

  return (
    <div className="relative container flex flex-col items-center justify-center md:grid md:h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative flex h-full flex-col items-center justify-center">
        {renderStageContent()}
      </div>
      <div className="bg-muted relative h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 mb-4 flex items-center text-lg font-medium md:mb-0">
          <Icons.logoIcon className="mr-2 h-8 w-8" />
          Zim Dev Labs
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;At first I thought it was a waste of time but the idea of
              joining and helping build a developer platform has awoken a spark
              in me.&rdquo;
            </p>
            <footer className="text-sm text-teal-400">Future Zoma</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
