import { RankIconWrapper } from "@/components/rank-icon-wrapper";
import { ranks } from "@/lib/constants";
import { Linkify } from "@/lib/utils";

export default function RankCard({ userPoints }: { userPoints: number }) {
  const getCurrentRank = (points: number) => {
    return (
      ranks.find(
        (rank) => points >= rank.minPoints && points <= rank.maxPoints,
      ) || ranks[ranks.length - 1]
    );
  };

  const getNextRank = (currentRank: (typeof ranks)[0]) => {
    const currentIndex = ranks.findIndex(
      (rank) => rank.name === currentRank.name,
    );
    return ranks[currentIndex + 1] || currentRank;
  };

  const currentRank = getCurrentRank(userPoints);
  const nextRank = getNextRank(currentRank!);

  const progressPercentage =
    ((userPoints - currentRank!.minPoints) /
      (nextRank.maxPoints - currentRank!.minPoints)) *
    100;

  const pointsToNextRank = nextRank.minPoints - userPoints;

  return (
    <div className="col-span-1 h-full w-full">
      <div className="grid h-full place-content-center rounded-lg bg-gray-100 p-4 shadow-md">
        <div className="w-full divide-y divide-gray-300">
          <div className="mb-4 flex w-full items-center gap-2">
            <RankIconWrapper
              h={64}
              w={64}
              className="mx-auto h-12 w-fit md:h-16"
              id={Linkify(currentRank!.name)}
            />
            <div
              id="#progressBar"
              className="block h-1 w-full min-w-[50px] flex-1 rounded-full bg-gray-300 md:h-2 md:min-w-[100px]"
            >
              <div
                className="h-full rounded-full bg-primaryColor"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <RankIconWrapper
              h={64}
              w={64}
              className="mx-auto h-12 w-fit md:h-16"
              id={Linkify(nextRank?.name)}
            />
          </div>
          <h5 className="pt-4 text-center text-sm">
            {pointsToNextRank > 0
              ? `${pointsToNextRank} Points to next rank`
              : "Max rank achieved"}
          </h5>
        </div>
      </div>
    </div>
  );
}
