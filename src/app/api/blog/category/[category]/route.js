import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';
import { NextResponse } from 'next/server';

export async function GET(req, contextPromise) {
  const context = await contextPromise; // ✅ Await the context first
  await dbConnect();

  const category = context?.params?.category;

  if (!category) {
    return NextResponse.json(
      { success: false, error: 'Category not provided' },
      { status: 400 }
    );
  }

  try {
    const blogs = await Blog.find({ category }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
