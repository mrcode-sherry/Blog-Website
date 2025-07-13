import { NextResponse } from 'next/server';
import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';

export async function PUT(req, { params }) {
  await dbConnect();
  const { slug } = params;

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
