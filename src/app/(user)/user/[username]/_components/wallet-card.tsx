import { WalletIcon } from "@heroicons/react/24/outline";

export default function WalletCard({ userPoints }: { userPoints: number }) {
  return (
    <div className="h-full w-full">
      <div className="grid h-full place-content-center rounded-lg bg-gray-100 p-4 shadow-md">
        <div className="w-fit divide-y divide-gray-300">
          <div>
            <WalletIcon className="mx-auto mb-2 h-12 w-fit text-primaryColor" />
            <h5 className="mb-2 text-center font-bold">Points</h5>
          </div>
          <div className="w-full pt-2">
            <div>
              <div className="mx-auto mb-4 flex w-fit items-center text-center text-sm text-gray-700">
                <div>{userPoints}</div>
              </div>
            </div>
            {/* <button className="text-sm px-4 py-2 bg-gray-700 text-white rounded-md mx-auto w-fit block">
              Withdraw
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
