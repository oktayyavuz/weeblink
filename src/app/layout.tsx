import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { prisma } from "@/lib/prisma";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const user = await prisma.user.findFirst({
    include: {
      settings: true,
    },
  });

  const siteTitle = user?.settings?.siteTitle || "WeebLink"
  const siteDescription = user?.settings?.siteDescription || "Modern, customizable link tree with beautiful animations"
  const siteLogo = user?.settings?.siteLogo

  return {
    title: siteTitle,
    description: siteDescription,
    icons: {
      icon: siteLogo ? `/api/favicon` : "/favicon.ico",
      shortcut: siteLogo ? `/api/favicon` : "/favicon.ico",
      apple: siteLogo ? `/api/favicon` : "/favicon.ico",
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      images: siteLogo ? [siteLogo] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: siteLogo ? [siteLogo] : [],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}