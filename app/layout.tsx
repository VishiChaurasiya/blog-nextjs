import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import postcss from "postcss";
import selectorNamespace from "postcss-selector-namespace";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const urls = [
    "https://www.personaliz.ai/blog/wp-content/fonts/4162983532923b21302becd7cab8dcdd.css",
    "https://www.personaliz.ai/blog/wp-includes/css/dist/block-library/style.min.css",
    "https://www.personaliz.ai/blog/wp-includes/css/classic-themes.min.css",
    "https://www.personaliz.ai/blog/wp-content/themes/summer-blog/style.css",
  ];

  const fetchCss = async (url: string) => {
    return fetch(url).then((response: any) => response.text());
  };

  const cssDataArray = await Promise.all(urls.map(fetchCss));

  const processedCssArray = await Promise.all(
    cssDataArray.map(async (cssData) => {
      const result = await postcss([
        selectorNamespace({ namespace: "#post-content" }),
      ]).process(cssData, { from: undefined });

      return result.css;
    })
  );

  const combinedCssData = processedCssArray.join("\n");

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: combinedCssData }} />

        {/* <link
          rel="stylesheet"
          href="https://www.personaliz.ai/blog/wp-content/fonts/4162983532923b21302becd7cab8dcdd.css"
        />
        <link
          rel="stylesheet"
          href="https://www.personaliz.ai/blog/wp-includes/css/dist/block-library/style.min.css"
        />
        <link
          rel="stylesheet"
          href="https://www.personaliz.ai/blog/wp-includes/css/classic-themes.min.css"
        />
        <link
          rel="stylesheet"
          href="https://www.personaliz.ai/blog/wp-content/themes/summer-blog/style.css"
        /> */}
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="mt-[72px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
