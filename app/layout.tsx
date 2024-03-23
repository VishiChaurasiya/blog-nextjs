import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Personaliz.ai | Send Personalized Videos and Audios at Scale",
    template: "%s - Personaliz.ai",
  },
  description:
    "Boost your outreach response rates with Personalized videos and Audios.",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_URL}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="mt-[72px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
