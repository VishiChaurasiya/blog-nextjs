import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const { path, type } = body;

  revalidatePath(path, type);

  return NextResponse.json({
    status: true,
    message: `Revalidated path: ${path}`,
  });
}
