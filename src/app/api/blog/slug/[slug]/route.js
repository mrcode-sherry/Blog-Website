import { NextResponse } from 'next/server';
import Blog from '@/backend/models/blog';
import dbConnect from '@/backend/db';

// ✅ GET: Blog by Slug
export async function GET(_, { params }) {
  await dbConnect();
  const { slug } = params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}