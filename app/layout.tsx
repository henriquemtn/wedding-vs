import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ClerkProvider } from "@clerk/nextjs";

const geistMono = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitor & Sharon",
  description: "Site para o casamento de Vitor e Sharon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${geistMono.variable} antialiased`}
        >
          {children}
          <Navigation />
        </body>
      </html>
    </ClerkProvider>

  );
}
