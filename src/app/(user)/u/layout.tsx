import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import { validateRequest } from "@/lib/auth/validate-request";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zim Developers Community",
  description: "An open-source community for developers in Zimbabwe.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user) {
    return notFound();
  }

  return (
    <html lang="en">
      <body className={`${inter.className} h-full antialiased`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
