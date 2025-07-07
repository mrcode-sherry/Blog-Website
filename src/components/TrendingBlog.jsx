'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const trendingBlogs = [
  {
    id: 1,
    title: 'Is Next.js the Future of Web?',
    image: '/LatestBlog/blog.jpg',
    category: 'Next.js',
    date: 'June 28, 2025',
    slug: 'nextjs-future',
  },
  {
    id: 2,
    title: 'Top 5 SEO Practices in 2025',
    image: '/LatestBlog/blog.jpg',
    category: 'SEO',
    date: 'June 27, 2025',
    slug: 'seo-practices-2025',
  },
  {
    id: 3,
    title: 'Mastering React Performance',
    image: '/LatestBlog/blog.jpg',
    category: 'React',
    date: 'June 25, 2025',
    slug: 'react-performance',
  },
  // Add more blogs if needed
];

const TrendingBlog = () => {
  return (
    <aside className="p-5 border-l-[2px] border-gray-300">
      {/* Heading */}
      <div className="mb-10">
        <div className="inline-block bg-indigo-600 text-white text-sm px-4 py-1 rounded-md font-semibold italic skew-x-[-10deg]">
          <span className="skew-x-[10deg] tracking-wider">Trending Blogs</span>
        </div>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-7">
        {trendingBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}
            className="flex items-start gap-3 group hover:opacity-90 transition-opacity"
          >
            {/* Blog Image with Overlay */}
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                width={64}
                height={64}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
            </div>

            {/* Blog Info */}
            <div className="flex flex-col text-sm text-gray-800 leading-tight">
              <p className="text-indigo-600 text-xs font-medium mb-2">
                {blog.category} • {blog.date}
              </p>
              <p className="font-semibold line-clamp-2 group-hover:text-indigo-600 duration-300">
                {blog.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default TrendingBlog;
