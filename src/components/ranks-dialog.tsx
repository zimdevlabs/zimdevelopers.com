"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { RankIconWrapper } from "./rank-icon-wrapper";

type RanksDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RanksDialog({ isOpen, onClose }: RanksDialogProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="data-[closed]:transform-[scale(95%)] relative w-full max-w-[300px] rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0">
            <div className="divide-y divide-gray-200 text-sm">
              <div className="flex gap-2 px-4 py-4 md:gap-4 md:px-6">
                <div>
                  <RankIconWrapper id="new-comer-1" height={50} width={50} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">
                    New Comer 1 - 5
                  </div>
                  <div className="text-xs text-gray-600">
                    200 - 2000 points rank. Limited feature access
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-4 py-4 md:gap-4 md:px-6">
                <div>
                  <RankIconWrapper id="contributor-2" height={50} width={50} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">
                    Contributor 1 - 5
                  </div>
                  <div className="text-xs text-gray-600">
                    2001 - 7000 points rank. A bit experienced
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-4 py-4 md:gap-4 md:px-6">
                <div>
                  <RankIconWrapper id="leader-3" height={50} width={50} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">Leader 1 - 5</div>
                  <div className="text-xs text-gray-600">
                    7001 - 10,000 points rank. Meaningful contributions
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-4 py-4 md:gap-4 md:px-6">
                <div>
                  <RankIconWrapper id="ambassador-4" height={50} width={50} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">
                    Ambassador 1 - 5
                  </div>
                  <div className="text-xs text-gray-600">
                    &gt; 10,000 points rank. Prominent IBZim figures
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 md:px-6">
                <Link
                  href="/ranking-system"
                  className="block w-full rounded-md border border-gray-200 py-2 text-center text-sm text-gray-600 hover:bg-gray-200"
                >
                  Details
                </Link>
              </div>
            </div>
            <div>
              <XMarkIcon
                className="absolute -top-8 size-6 cursor-pointer text-white md:-right-6"
                onClick={onClose}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
