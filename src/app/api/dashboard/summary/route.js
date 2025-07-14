import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const blogs = await Blog.find();

    const totalViews = blogs.reduce((acc, blog) => acc + (blog.views || 0), 0);
    const totalBlogs = blogs.length;

    const categoryMap = {};
    blogs.forEach((blog) => {
      const cat = blog.category || 'Uncategorized';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const blogsByCategory = Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count,
    }));

    return NextResponse.json({
      success: true,
      data: {
        views: totalViews,
        blogs: totalBlogs,
        traffic: totalViews, // optional alias
        blogsByCategory,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
