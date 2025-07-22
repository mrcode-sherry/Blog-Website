// pages/api/upload-image.js
import { IncomingForm } from 'formidable';
import fs from 'fs';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form Error:', err);
      return res.status(500).json({ message: 'Error parsing the form' });
    }

    const file = files.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'blog-images',
      });

      return res.status(200).json({ url: result.secure_url });
    } catch (err) {
      console.error('Cloudinary Error:', err);
      return res.status(500).json({ message: 'Cloudinary Upload Failed' });
    }
  });
}
