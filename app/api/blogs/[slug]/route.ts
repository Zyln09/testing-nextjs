import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Fetch a single blog by slug
export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const blog = await db.select().from(blogs).where(eq(blogs.slug, params.slug));

        if (blog.length === 0) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog[0]);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}
