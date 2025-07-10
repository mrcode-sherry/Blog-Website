import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const blogs = await Blog.find();

    const categoryMap = {};

    blogs.forEach((blog) => {
      const cat = blog.category.toLowerCase();

      if (!categoryMap[cat]) {
        categoryMap[cat] = {
          category: blog.category,
          slug: cat,
          count: 1,
          image: blog.img || "/LatestBlog/blog.jpg", // fixed: using img
        };
      } else {
        categoryMap[cat].count++;
      }
    });

    const categories = Object.values(categoryMap);

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
