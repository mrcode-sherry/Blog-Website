'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Tech',
    count: 3410,
    image: '/LatestBlog/blog.jpg',
    slug: 'tech',
  },
  {
    name: 'Business',
    count: 3141,
    image: '/LatestBlog/blog.jpg',
    slug: 'business',
  },
  {
    name: 'News',
    count: 421,
    image: '/LatestBlog/blog.jpg',
    slug: 'news',
  },
  {
    name: 'Lifestyle',
    count: 1985,
    image: '/LatestBlog/blog.jpg',
    slug: 'lifestyle',
  },
  {
    name: 'Health',
    count: 2037,
    image: '/LatestBlog/blog.jpg',
    slug: 'health',
  },
  {
    name: 'Biography',
    count: 110,
    image: '/LatestBlog/blog.jpg',
    slug: 'biography',
  },
  {
    name: 'Education',
    count: 347,
    image: '/LatestBlog/blog.jpg',
    slug: 'education',
  },
  {
    name: 'Marketing',
    count: 324,
    image: '/LatestBlog/blog.jpg',
    slug: 'marketing',
  },
];

const CategoryBlog = () => {
  return (
    <section className="px-4 md:px-20 py-12">
      {/* Section Heading */}
      <div className="flex items-center justify-center mb-8 relative">
        <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <span className="relative z-10 inline-block mb-5 rounded-md px-4 py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-[25px]">
            <span className="skew-x-[10deg] tracking-wide">Blogs Category</span>
          </span>
        </div>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            href={`/blogs/${cat.slug}`}
            key={cat.slug}
            className="group border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-indigo-700 group-hover:text-indigo-900 transition">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600">{cat.count} Articles</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryBlog;

