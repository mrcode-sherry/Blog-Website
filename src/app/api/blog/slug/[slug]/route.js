import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  await dbConnect();
  const slug = context.params.slug;

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
