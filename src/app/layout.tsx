import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "WhatDo? - Ceate Apps and Websites by Chatting with AI",
  description: "Create apps and websites by chatting with AI. Build custom applications, websites, and interactive projects through natural conversation with our AI-powered development platform.",
  openGraph: {
    title: "WhatDo? - Ceate Apps and Websites by Chatting with AI",
    description: "Create apps and websites by chatting with AI. Build custom applications, websites, and interactive projects through natural conversation with our AI-powered development platform.",
    type: "website",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        alt: "WhatDo? - Deploy apps and websites with AI.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatDo? - Ceate Apps and Websites by Chatting with AI",
    description: "Create apps and websites by chatting with AI. Build custom applications, websites, and interactive projects through natural conversation with our AI-powered development platform.",
    images: [
      `${baseUrl}/opengraph-image.png`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#C96342",
        },
      }}
    >
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
};