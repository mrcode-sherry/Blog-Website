import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

// ✅ GET: Blogs by Category
export async function GET(_, { params }) {
  await dbConnect();
  const { category } = params;

  try {
    const blogs = await Blog.find({ category: category }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}