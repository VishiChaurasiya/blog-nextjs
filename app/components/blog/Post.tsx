import Link from "next/link";
import Image from "next/image";
import { Post as IPost } from "@/app/actions/getPosts";

interface PostProps {
  post: IPost;
  disableLink?: boolean;
}

const Post = ({ post, disableLink }: PostProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-[25px] lg:gap-[40px]">
      <div className="flex-[1]">
        {post.featuredImage &&
          (disableLink ? (
            <Image
              width="600"
              height="380"
              src={post.featuredImage.node.sourceUrl}
              alt="personaliz_logo"
              className="w-full lg:aspect-square rounded-[20px] object-cover"
            />
          ) : (
            <Link href={`/blog/${post.slug}`}>
              <Image
                width="600"
                height="380"
                src={post.featuredImage.node.sourceUrl}
                alt="personaliz_logo"
                className="w-full lg:aspect-square rounded-[20px] object-cover"
              />
            </Link>
          ))}
      </div>

      <div className="flex-[2] flex flex-col justify-center gap-[10px] md:gap-[25px]">
        <Link
          href={`/blog/tag/${post.tags.nodes[0].slug}`}
          className="rounded-[5px] bg-black/5 px-[20px] py-[8px] text-sm font-medium max-w-max"
        >
          {post.tags.nodes[0].name}
        </Link>

        {disableLink ? (
          <h1 className="lg:text-[30px] font-semibold leading-[1.3]">
            {post.title}
          </h1>
        ) : (
          <Link href={`/blog/${post.slug}`}>
            <h1 className="lg:text-[30px] font-semibold leading-[1.3]">
              {post.title}
            </h1>
          </Link>
        )}

        {post.excerpt && (
          <div
            className="text-sm lg:text-lg text-black/60"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}

        <div>
          <span className="text-sm lg:text-lg font-medium">Santosh Thota</span>
          &nbsp; &nbsp;
          <span className="text-sm lg:text-base text-black/40">
            | &nbsp; {post.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
