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

  if (!post) return {};

  const seo = post.seo;

  return {
    title: { absolute: seo.title },
    description: seo.opengraphDescription,
    openGraph: {
      images: [
        {
          url: seo.opengraphImage.sourceUrl,
        },
      ],
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_URL}`),
  };
}

const blog = async ({ params }: { params: IParams }) => {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  const dom = new JSDOM(post.content);
  const doc = dom.window.document;
  const headings = doc.querySelectorAll("h2, h3");
  const headingList = Array.from(headings).map((heading) => ({
    element: heading.tagName.toLowerCase(),
    text: heading.textContent?.trim() || "",
  }));

  return (
    <div>
      <header className="px-[15px] py-[40px] md:px-[92px] md:py-[64px] bg-black/5">
        <Post post={post} disableLink />
      </header>

      <main className="px-[15px] py-[40px] md:px-[92px] md:py-[64px] flex justify-between gap-8 relative">
        <section
          id="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <SideNavbar headingList={headingList} />
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
