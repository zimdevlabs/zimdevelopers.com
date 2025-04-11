import { Squares2X2Icon } from "@heroicons/react/24/outline";

export default function OverViewCard({
  commentsCount,
  savedArticlesCount,
  userPosition,
  totalUsers,
}: {
  commentsCount: number;
  savedArticlesCount: number;
  userPosition: number;
  totalUsers: number;
}) {
  return (
    <div className="col-span-full h-full w-full md:col-span-2">
      <div className="grid h-full place-content-center rounded-lg bg-gray-700 p-4 shadow-md">
        <div className="w-fit divide-y divide-gray-600 text-white">
          <div>
            <Squares2X2Icon className="mx-auto mb-2 h-12 w-fit text-primaryColor" />
            <h5 className="mb-2 text-center">Overview</h5>
          </div>
          <div className="mx-auto flex w-fit items-center gap-4 py-2">
            <div className="flex flex-col items-center">
              <div className="md:text-lg">{commentsCount}</div>
              <div className="text-xs text-gray-500 md:text-sm">Comments</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="md:text-lg">{savedArticlesCount}</div>
              <div className="text-xs text-gray-500 md:text-sm">Saved</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="md:text-lg">
                {userPosition}{" "}
                <span className="text-xs text-gray-400">/ {totalUsers}</span>
              </div>
              <div className="text-xs text-gray-500 md:text-sm">Position</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
