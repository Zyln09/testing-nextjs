import { NextRequest } from "next/server";
import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    // Properly await the params before using them
    const { slug } = await context.params;

    const blog = await db.select()
        .from(blogs)
        .where(eq(blogs.slug, slug));

    if (!blog.length) {
        return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json(blog[0]);
}
