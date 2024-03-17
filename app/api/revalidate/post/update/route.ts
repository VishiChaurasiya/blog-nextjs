import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const slug = body.post.post_name;

  revalidatePath("blog");
  revalidatePath(`blog/${slug}`);
  revalidatePath("blog/tag");
  revalidatePath(`blog/tag/${slug}`);

  return NextResponse.json({
    status: true,
    message: `Revalidated path successfully`,
  });
}
