import { getTags } from "@/app/actions/getTags";
import Search from "@/app/components/blog/Search";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "../actions/getPosts";
import Post from "../components/blog/Post";

interface Color {
  bg: string;
  font: string;
}

const color: { [key: number]: Color } = {
  0: { bg: "#FFEFDB", font: "#8F5000" },
  1: { bg: "#EDE9FF", font: "#10009F" },
  2: { bg: "#EDFFD7", font: "#038F00" },
};

const blogs = async () => {
  const tags = await getTags();
  const posts = await getPosts();
  const firstPost = posts[0];
  const otherPosts = [1, 2, 3].map((index) => posts[index]);

  return (
    <div>
      <Search
        name="Personaliz.ai Blog"
        description="Unlocking Your Digital Persona: Exploring the Power of Personaliz.ai!"
        tags={tags}
      />
      <main className="px-[15px] py-[40px] lg:px-[92px] lg:py-[64px]">
        <h1 className="text-[25px] lg:text-[36px] font-semibold mb-[30px] lg:mb-[45px]">
          Hot Off the Press..!
        </h1>
        <Post post={firstPost} />
        <div className="mt-[30px] lg:mt-[65px] flex flex-col lg:flex-row justify-between items-center gap-8">
          {otherPosts.map((post, index) => (
            <article className="flex flex-col gap-4 flex-1" key={index}>
              <Link href={`/blog/${post.slug}`}>
                <Image
                  width="390"
                  height="200"
                  src={post.featuredImage.node.sourceUrl}
                  alt="personaliz_logo"
                  className="w-full lg:w-[390px] lg:h-[228px] flex-shrink-0 aspect-[1.5] rounded-[20px]"
                />
              </Link>
              <Link
                href={`/blog/tag/${post.tags.nodes[0].slug}`}
                className={`rounded-[5px] px-[20px] py-[8px] text-sm font-medium max-w-max`}
                style={{
                  backgroundColor: color[index].bg,
                  color: color[index].font,
                }}
              >
                {post.tags.nodes[0].name}
              </Link>
              <Link href={`/blog/${post.slug}`}>
                <h1 className="lg:text-lg font-semibold">{post.title}</h1>
              </Link>
              <span className="text-sm lg:text-base text-black/60">
                {post.date}
              </span>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default blogs;
