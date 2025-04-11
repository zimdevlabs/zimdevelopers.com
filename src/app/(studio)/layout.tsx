import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zim Developers Community",
  description: "A feature rich developer community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <main className="bg-white text-zinc-900">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
