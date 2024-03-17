import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const slug = body.post.post_name;

  revalidateTag("api");
  revalidatePath("blog");
  revalidatePath(`blog/${slug}`, "page");
  revalidatePath("blog/tag");
  revalidatePath(`blog/tag/${slug}`, "page");

  return NextResponse.json({
    status: true,
    message: `Path revalidated successfully`,
  });
}
