import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  await dbConnect();
  const { slug } = params;

  try {
    await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
