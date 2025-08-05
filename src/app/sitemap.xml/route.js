import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import dbConnect from '@/backend/db';
import Blog from '@/backend/models/blog';

export async function GET() {
  const baseUrl = 'https://www.kintechy.com'; // Change this to your production domain

  // Connect to your MongoDB database
  await dbConnect();

  // Fetch only slug and category for sitemap efficiency
  const blogs = await Blog.find({}, 'slug category').lean();

  // Static and public pages
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'daily', priority: 0.7 },
    { url: '/contact', changefreq: 'daily', priority: 0.7 },
    { url: '/privacy-policy', changefreq: 'daily', priority: 0.6 },
  ];

  // Blog categories (these are the main blog listing pages for each category)
  const categories = [
    'technology',
    'finance',
    'business',
    'sports',
    'health',
  ];

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

  // Generate XML from the links
  const stream = new SitemapStream({ hostname: baseUrl });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
