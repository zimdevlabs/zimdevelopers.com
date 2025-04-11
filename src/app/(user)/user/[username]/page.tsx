import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";
import { getUserPosition } from "./_components/actions";
import WalletCard from "./_components/wallet-card";
import OverViewCard from "./_components/overview-card";
import RankCard from "./_components/rank-card";

export const metadata = {
  title: "My Profle",
  description: "User dashboard",
};

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function ProfilePage({ params }: Props) {
  const { user } = await validateRequest();
  const { username } = await params;

  if (!user) {
    redirect(Paths.Login);
  }

  if (user.username != username) {
    redirect(Paths.Home);
  }

  const { position, totalUsers } = await getUserPosition(user.id);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-4">
        <div className="col-span-1 hidden h-full w-full md:block">
          <WalletCard userPoints={user.totalPoints} />
        </div>
        <OverViewCard
          commentsCount={0}
          savedArticlesCount={0}
          userPosition={position}
          totalUsers={totalUsers}
        />
        <div className="col-span-1 h-full w-full md:hidden">
          <WalletCard userPoints={user.totalPoints} />
        </div>

        <RankCard userPoints={user.totalPoints} />
      </div>
    </section>
  );
}
