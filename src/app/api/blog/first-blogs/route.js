import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Blog from "@/backend/models/blog";

export async function GET() {
  await dbConnect();

  const categories = [
    "technology",
    "finance",
    "business",
    "sports",
    "health",
  ];

  try {
    const blogs = await Promise.all(
      categories.map(async (category) => {
        const blog = await Blog.findOne({ category: category.toLowerCase() }).sort({ createdAt: -1 });
        return blog;
      })
    );

    const filteredBlogs = blogs.filter((b) => b !== null);

    const result = filteredBlogs.map((blog) => ({
      title: blog.title,
      desc: blog.desc,
      category: blog.category,
      date: new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: blog.author,
      img: blog.img,
      slug: blog.slug,
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
