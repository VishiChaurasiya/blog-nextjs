import { getPosts } from "@/app/actions/getPosts";

interface IParams {
  slug?: string;
}

const blog = async ({ params }: { params: IParams }) => {
  const posts = await getPosts();
  const data = posts.find((post) => post.slug === params.slug);

  if (!data) return <h1>Post not found</h1>;

  return (
    <div>
      <h1 className="mt-[100px]">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
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
