import { MetadataRoute } from "next";
import { getPosts } from "./actions/getPosts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const slugs = posts.map((post) => post.slug);

  const postEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
    // lastModified: new Date(post.updatedAt),
    // changeFrequency:,
    // priority:
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    },
    ...postEntries,
  ];
}
