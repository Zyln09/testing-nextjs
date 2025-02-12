"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, slug, content, author }),
        });

        if (res.ok) {
            router.push("/blogs");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Slug (URL-friendly title)"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Publish
                </button>
            </form>
        </div>
    );
}
