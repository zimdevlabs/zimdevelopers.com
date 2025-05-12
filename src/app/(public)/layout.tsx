import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import { validateRequest } from "@/lib/auth/validate-request";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { GradientBackground } from "@/components/home/gradient";

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

  return (
    <html lang="en">
      <body className={`${inter.className} h-full antialiased`}>
        <GradientBackground />
        <Container>
          <Navbar user={user || undefined} />
        </Container>
        {children}
        <Footer user={user} />
        <Analytics />
      </body>
    </html>
  );
}
