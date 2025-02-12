"use client";

import { useEffect, useState } from "react";

interface Blog {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export default function BlogPage({ params }: { params: { slug: string } }) {
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        fetch(`/api/blogs/${params.slug}`)
            .then((res) => res.json())
            .then(setBlog);
    }, [params.slug]);

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-500">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
            <div className="mt-6">{blog.content}</div>
        </div>
    );
}
