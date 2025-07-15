import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ message: 'No image received' }, { status: 400 });
    }

    // You can now save `image` to your DB or file system.
    // It's already in base64 format.

    return NextResponse.json({ message: 'Image received successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
