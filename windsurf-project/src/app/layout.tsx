import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "rishith chennupati",
  description: "portfolio of rishith chennupati - developer, creator, dreamer",
  keywords: ["rishith", "chennupati", "portfolio", "developer"],
  authors: [{ name: "Rishith Chennupati" }],
  openGraph: {
    title: "rishith chennupati",
    description: "portfolio of rishith chennupati",
    url: "https://rishithc.com",
    siteName: "rishith chennupati",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-[#0a0f1a] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
