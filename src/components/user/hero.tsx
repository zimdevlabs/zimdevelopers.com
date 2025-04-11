"use client";

import { User } from "lucia";
import { Linkify } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { ranks } from "@/lib/constants";
import { RankIconWrapper } from "../rank-icon-wrapper";
import RanksDialog from "../ranks-dialog";

type UserHeroProps = {
  user: User;
};

export function getCurrentRank(points: number) {
  return (
    ranks.find(
      (rank) => points >= rank.minPoints && points <= rank.maxPoints,
    ) || ranks[ranks.length - 1]
  );
}

export default function UserHero({ user }: UserHeroProps) {
  const fname = user.name ? user.name.split(" ")[0] : "I";
  const lname = user.name ? user.name.split(" ")[1] : "B";

  const points = user.totalPoints;

  const getNextRank = (currentRank: (typeof ranks)[0]) => {
    const currentIndex = ranks.findIndex(
      (rank) => rank.name === currentRank.name,
    );
    return ranks[currentIndex + 1] || currentRank;
  };

  const userRank = getCurrentRank(points)!;
  const nextRank = getNextRank(userRank!);

  const percentageCompletion = Math.min(
    Math.round(
      ((points - userRank.minPoints) /
        (nextRank.maxPoints - userRank.minPoints)) *
        100,
    ),
    100,
  );

  const formatRankName = (rankName: string) => {
    const parts = rankName.split(" ");
    if (parts.length > 1) {
      const lastPart = parts.pop();
      return [...parts, "Level", lastPart].join(" ");
    }
    return rankName;
  };

  const [isRanksOpen, setRanksIsOpen] = useState(false);

  function openRanks() {
    setRanksIsOpen(true);
  }

  function closeRanks() {
    setRanksIsOpen(false);
  }

  return (
    <section className="flex w-full flex-col items-center pb-10 pt-24 md:py-24">
      <div className="mb-4 flex w-fit items-center gap-4">
        {user.avatar ? (
          <div className="rounded-full border-2 border-slate-200">
            <Image
              alt={user.name!}
              height={100}
              width={100}
              src={user.avatar}
              className="h-20 w-20 rounded-full md:h-24 md:w-24"
            />
          </div>
        ) : (
          <div className="grid h-20 w-20 place-content-center rounded-full bg-slate-900 md:h-24 md:w-24">
            <span className="text-2xl capitalize text-white md:text-4xl">
              {fname![0]}
              {lname![0]}
            </span>
          </div>
        )}

        <div>
          <h1 className="text-lg font-bold capitalize md:text-2xl">
            {user.name ? user.name : `User ${user.id}`}
          </h1>
          <h2 className="">
            @{user.username ? user.username : `user-${user.id}`}
          </h2>
        </div>
      </div>
      <div className="mb-8 flex max-w-[200px] items-center md:max-w-[300px]">
        <RankIconWrapper
          onClick={openRanks}
          height={80}
          width={80}
          className="mr-4 block h-[60px] w-fit cursor-pointer md:h-[80px]"
          id={Linkify(userRank?.name)}
        />
        <RanksDialog isOpen={isRanksOpen} onClose={closeRanks} />
        <div className="w-full">
          <div className="mb-2 text-sm text-gray-600 md:text-base">
            {formatRankName(userRank!.name)} ({percentageCompletion}%)
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primaryColor"
              style={{ width: `${percentageCompletion}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
