import { getPosts } from "@/app/actions/getPosts";
import { getTags } from "@/app/actions/getTags";
import Link from "next/link";

interface IParams {
  slug?: string;
}

const blogs = async ({ params }: { params: IParams }) => {
  const posts = await getPosts();
  const data = posts.filter((post) =>
    post.tags.nodes.some((tag) => tag.slug === params.slug)
  );

  return (
    <div className="mt-[100px]">
      {data.map((post, index) => (
        <div key={index}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          {/* <div dangerouslySetInnerHTML={{ __html: data.content }} /> */}
        </div>
      ))}
    </div>
  );
};

export default blogs;

export async function generateStaticParams() {
  const tags = await getTags();
  const slugs = tags.map((tag) => tag.slug);

  return slugs.map((slug) => ({
    slug,
  }));
}
