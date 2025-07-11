import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

// ✅ GET: Trending Blogs (most viewed)
export async function GET() {
  await dbConnect();
  try {
    const blogs = await Blog.find().sort({ views: -1 }).limit(14); // most viewed blogs
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}