import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Banner from "@/components/banner";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Paths } from "@/lib/constants";
import UserHero from "@/components/user/hero";
import UserNav from "@/components/user/user-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zim Developers Community",
  description: "A feature rich developer community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user) {
    redirect(Paths.Login);
  }
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Banner />
          <Header user={user} />
          <UserHero user={user} />
          <UserNav username={user.username!} />
          <main className="bg-white text-zinc-900">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
