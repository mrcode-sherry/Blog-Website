import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ message: 'No image received' }, { status: 400 });
    }

    // Upload base64 image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'blog-images', // Optional: a specific folder in Cloudinary
    });

    const imageUrl = uploadResponse.secure_url;

    // Save `imageUrl` to your database if needed here

    return NextResponse.json({ message: 'Image uploaded successfully', url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
