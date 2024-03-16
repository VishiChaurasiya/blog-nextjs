import { getTitles } from "@/app/actions/titles";

interface IParams {
  slug?: string;
}

const blog = async ({ params }: { params: IParams }) => {
  return <h1>Blog Page {params.slug}</h1>;
};

export default blog;

export async function generateStaticParams() {
  const titles = await getTitles();
  return titles.map((title) => ({
    slug: title,
  }));
}

// export async function generateMetadata({ params }) {
//   const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
//   if (!blog) {
//     return;
//   }

//   const publishedAt = new Date(blog.publishedAt).toISOString();
//   const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

//   let imageList = [siteMetadata.socialBanner];
//   if (blog.image) {
//     imageList =
//       typeof blog.image.filePath === "string"
//         ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
//         : blog.image;
//   }
//   const ogImages = imageList.map((img) => {
//     return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
//   });

//   const authors = blog?.author ? [blog.author] : siteMetadata.author;

//   return {
//     title: blog.title,
//     description: blog.description,
//     openGraph: {
//       title: blog.title,
//       description: blog.description,
//       url: siteMetadata.siteUrl + blog.url,
//       siteName: siteMetadata.title,
//       locale: "en_US",
//       type: "article",
//       publishedTime: publishedAt,
//       modifiedTime: modifiedAt,
//       images: ogImages,
//       authors: authors.length > 0 ? authors : [siteMetadata.author],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: blog.description,
//       images: ogImages,
//     },
//   };
// }
