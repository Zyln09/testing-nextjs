import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema";

// Fetch all blogs
export async function GET() {
    try {
        const allBlogs = await db.select().from(blogs);
        return NextResponse.json(allBlogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const { title, slug, content, featuredImage, author } = await req.json();

        if (!title || !slug || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newBlog = await db.insert(blogs).values({
            title,
            slug,
            content,
            featuredImage,
            author,
        }).returning();

        return NextResponse.json(newBlog[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}

