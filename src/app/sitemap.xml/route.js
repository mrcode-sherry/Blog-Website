export const dynamic = 'force-dynamic'; // Ensures this stays server-side and dynamic

import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';

export async function GET() {
  const baseUrl = 'https://www.kintechy.com';

  // Connect to your MongoDB
  await dbConnect();

  // Fetch blog slugs and categories
  const blogs = await Blog.find({}, 'slug category').lean();

  // Static routes
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'daily', priority: 0.7 },
    { url: '/contact', changefreq: 'daily', priority: 0.7 },
    { url: '/privacy-policy', changefreq: 'daily', priority: 0.6 },
  ];

  // Blog category listing pages
  const categories = ['technology', 'finance', 'business', 'sports', 'health'];
  categories.forEach((category) => {
    links.push({
      url: `/blogs/${category}`,
      changefreq: 'daily',
      priority: 0.7,
    });
  });

  // Add individual blog posts
  blogs.forEach((blog) => {
    links.push({
      url: `/blogs/${blog.category}/${blog.slug}`,
      changefreq: 'daily',
      priority: 0.8,
    });
  });

  // Generate XML
  const stream = new SitemapStream({ hostname: baseUrl });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );

  // Return with correct headers
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
