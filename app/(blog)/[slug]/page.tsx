import { getPosts } from "@/app/actions/getPosts";
import CTA from "@/app/components/blog/CTA";
import Post from "@/app/components/blog/Post";
import SideNavbar from "@/app/components/blog/SideNavbar";
import { notFound } from "next/navigation";
import { JSDOM } from "jsdom";
import { Metadata } from "next";

interface IParams {
  slug?: string;
}

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.slug}`;

  if (!post) return {};

  const seo = post.seo;

  // return {
  //   title: { absolute: seo.title },
  //   description: seo.opengraphDescription,
  //   openGraph: {
  //     images: [
  //       {
  //         url: seo.opengraphImage?.sourceUrl || "",
  //       },
  //     ],
  //   },
  // };

  return {
    metadataBase: new URL(url),
    title: { absolute: seo.title },
    description: seo.metaDesc,
    authors: [
      {
        name: seo.opengraphAuthor,
        url,
      },
    ],
    twitter: {
      card: "summary_large_image",
      creator: "@personaliz_ai",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: seo.twitterImage?.mediaItemUrl || "",
    },
    robots:
      seo.metaRobotsNoindex === "noindex" ||
      seo.metaRobotsNofollow === "nofollow"
        ? "noindex, nofollow"
        : "index, follow",
    alternates: {
      canonical: url,
      languages: {
        "en-US": "/",
      },
    },
    openGraph: {
      locale: "en-US",
      type: "website",
      url,
      title: seo.opengraphTitle,
      description: seo.opengraphDescription,
      siteName: seo.opengraphSiteName,
      images: [
        {
          url: seo.opengraphImage?.mediaItemUrl || "",
        },
      ],
    },
    assets: seo.opengraphImage?.mediaItemUrl || "",
    keywords: seo.metaKeywords.split(","),
  };
}

const blog = async ({ params }: { params: IParams }) => {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  const seo = post.seo;
  const schema = seo.schema.raw.replace(
    /https:\/\/www.personaliz.ai\/blog(?!\/wp-content\/uploads)/g,
    `${process.env.NEXT_PUBLIC_BASE_URL}`
  );

  const dom = new JSDOM(post.content);
  const doc = dom.window.document;

  // Extracting all the h2 and h3 headings
  const headings = doc.querySelectorAll("h2, h3");
  const headingList = Array.from(headings).map((heading) => ({
    element: heading.tagName.toLowerCase(),
    text: heading.textContent?.trim() || "",
  }));

  // Adding id to all the h2 and h3 headings
  let counter = 1;
  doc.querySelectorAll("h2, h3").forEach((heading) => {
    const element = heading.tagName.toLowerCase();
    heading.id = `personaliz-blog-${element}-${counter++}`;
  });
  const updatedContent = dom.serialize();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      ></script>

      <header className="px-[15px] py-[40px] md:px-[92px] md:py-[64px] bg-black/5">
        <Post post={post} disableLink />
      </header>

      <main className="px-[15px] py-[40px] md:px-[92px] md:py-[64px] flex justify-between gap-8">
        <SideNavbar headingList={headingList} />
        <section
          id="post-content"
          dangerouslySetInnerHTML={{ __html: updatedContent }}
        />
      </main>
      <CTA />
    </div>
  );
};

export default blog;

export async function generateStaticParams() {
  const posts = await getPosts();
  const slugs = posts.map((post) => post.slug);

  return slugs.map((slug) => ({
    slug,
  }));
}
