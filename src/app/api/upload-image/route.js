import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ message: 'No image received' }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'blog-images',
      timeout: 60000, // Increased timeout
    });

    const imageUrl = uploadResponse.secure_url;

    return NextResponse.json({ message: 'Image uploaded successfully', url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Cloudinary error: ' + error.message }, { status: 500 });
  }
}
