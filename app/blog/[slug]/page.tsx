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

      <div className="flex justify-between gap-6 mt-[40px] md:mt-[90px] ">
        <div
          id="post-content"
          className="flex-[3]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="hidden lg:block flex-1 flex-shrink-0">
          
        </div>
      </div>
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
