"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetch("/api/blogs")
            .then((res) => res.json())
            .then(setBlogs);
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
            <Link href="/blogs/new" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create New Blog
            </Link>
            <ul className="mt-4 space-y-4">
                {blogs.map((blog) => (
                    <li key={blog.id} className="border p-4 rounded-lg">
                        <Link href={`/blogs/${blog.slug}`} className="text-xl font-semibold text-blue-600">
                            {blog.title}
                        </Link>
                        <p className="text-gray-500 text-sm">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
