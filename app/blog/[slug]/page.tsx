import { getPosts } from "@/app/actions/getPosts";
import CTA from "@/app/components/blog/CTA";
import Post from "@/app/components/blog/Post";
import SideNavbar from "@/app/components/blog/SideNavbar";
import { notFound } from "next/navigation";

interface IParams {
  slug?: string;
}

const blog = async ({ params }: { params: IParams }) => {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

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

        <SideNavbar content={post.content} />
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
