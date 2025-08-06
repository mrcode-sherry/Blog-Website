export const dynamic = 'force-dynamic'; // This ensures Google can fetch the dynamic sitemap

import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';

export async function GET() {
  const baseUrl = 'https://www.kintechy.com';

  // Connect to MongoDB
  await dbConnect();

  // Fetch all blogs (only slug and category)
  const blogs = await Blog.find({}, 'slug category').lean();

  // Static pages
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'daily', priority: 0.7 },
    { url: '/contact', changefreq: 'daily', priority: 0.7 },
    { url: '/privacy-policy', changefreq: 'daily', priority: 0.6 },
  ];

  // Categories
  const categories = ['technology', 'finance', 'business', 'sports', 'health'];
  categories.forEach((category) => {
    links.push({
      url: `/blogs/${category}`,
      changefreq: 'daily',
      priority: 0.7,
    });
  });

  // Individual blog posts
  blogs.forEach((blog) => {
    links.push({
      url: `/blogs/${blog.category}/${blog.slug}`,
      changefreq: 'daily',
      priority: 0.8,
    });
  });

  // Generate sitemap XML
  const stream = new SitemapStream({ hostname: baseUrl });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate', // optional, helps cache control
    },
  });
}
