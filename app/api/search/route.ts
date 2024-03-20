import { getPosts } from "@/app/actions/getPosts";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query: string = body.query;
    const posts = await getPosts();

    const filteredPosts = posts
      .filter((post) => post.title.toLowerCase().includes(query))
      .map((post) => ({ title: post.title, slug: post.slug }));

    return NextResponse.json({
      status: true,
      filteredPosts,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      status: false,
      message: "Something went wrong",
    });
  }
}
