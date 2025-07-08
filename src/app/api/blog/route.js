import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

// ✅ POST: Create a new blog
export async function POST(req) {
  await dbConnect();
  try {
    const data = await req.json();
    const blogData = await Blog.create(data);

    return NextResponse.json({
      success: true,
      blog: blogData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch all blogs
export async function GET(req) {
  await dbConnect();
  try {
    const blogData = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      blogs: blogData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
