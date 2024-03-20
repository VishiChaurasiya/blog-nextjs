import { getPosts } from "@/app/actions/getPosts";
import Post from "@/app/components/blog/Post";
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
    <div className="px-[15px] py-[40px] md:px-[92px] md:py-[64px]">
      <Post post={post} disableLink />

      <div
        id="post-content"
        className="mt-[40px] md:mt-[90px]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
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
