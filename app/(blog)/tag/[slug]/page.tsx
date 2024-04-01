import Link from "next/link";
import Search from "@/app/components/blog/Search";
import { getPosts } from "@/app/actions/getPosts";
import { notFound } from "next/navigation";
import { getTags } from "@/app/actions/getTags";
import Image from "next/image";
import CTA from "@/app/components/blog/CTA";

interface IParams {
  slug?: string;
}

interface Color {
  bg: string;
  font: string;
}

const color: { [key: number]: Color } = {
  0: { bg: "#FFEFDB", font: "#8F5000" },
  1: { bg: "#EDE9FF", font: "#10009F" },
  2: { bg: "#EDFFD7", font: "#038F00" },
};

const blogs = async ({ params }: { params: IParams }) => {
  const posts = await getPosts();
  const tags = await getTags();

  const tag = tags.find((tag) => tag.slug === params.slug);
  const filteredPosts = posts.filter((post) =>
    post.tags.nodes.some((tag) => tag.slug === params.slug)
  );

  if (!filteredPosts.length || !tag) {
    return notFound();
  }

  return (
    <div>
      <Search name={tag.name} description={tag.description} tags={tags} />
      <main className="px-[15px] py-[40px] lg:px-[92px] lg:py-[64px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
        {filteredPosts.map((post, index) => (
          <article className="flex flex-col gap-4 flex-1" key={index}>
            <Link href={`/${post.slug}`}>
              {post.featuredImage && (
                <Image
                  width="390"
                  height="200"
                  src={post.featuredImage.node.sourceUrl}
                  alt="personaliz_logo"
                  className="w-full lg:w-[390px] lg:h-[228px] flex-shrink-0 aspect-[1.5] rounded-[20px]"
                />
              )}
            </Link>
            <Link
              href={`/tag/${post.tags.nodes[0].slug}`}
              className={`rounded-[5px] px-[20px] py-[8px] text-sm font-medium max-w-max`}
              style={{
                backgroundColor: color[index % 3].bg,
                color: color[index % 3].font,
              }}
            >
              {post.tags.nodes[0].name}
            </Link>
            <Link href={`/${post.slug}`}>
              <h1 className="lg:text-lg font-semibold">{post.title}</h1>
            </Link>
            <span className="text-sm lg:text-base text-black/60">
              {post.date}
            </span>
          </article>
        ))}
      </main>
      <CTA />
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
