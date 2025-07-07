'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const blogData = [
  {
    id: 1,
    title: '10 Tips to Improve Your React Skills',
    description: 'Master React with these practical tips and tricks to build better apps.',
    image: '/LatestBlog/blog.jpg',
    category: 'React',
    date: 'July 1, 2025',
    slug: 'react-skills-tips',
  },
  {
    id: 2,
    title: 'Understanding JavaScript Closures',
    description: 'A deep dive into closures and how they power powerful JS features.',
    image: '/LatestBlog/blog.jpg',
    category: 'JavaScript',
    date: 'June 29, 2025',
    slug: 'javascript-closures',
  },
  {
    id: 3,
    title: 'Is Next.js the Future of Web?',
    description: 'Exploring Next.js features and whether it will dominate future web development.',
    image: '/LatestBlog/blog.jpg',
    category: 'Next.js',
    date: 'June 28, 2025',
    slug: 'nextjs-future-web-1',
  },
  {
    id: 4,
    title: 'The Rise of Server Components',
    description: 'Learn how server components improve performance in modern React apps.',
    image: '/LatestBlog/blog.jpg',
    category: 'Next.js',
    date: 'June 27, 2025',
    slug: 'server-components',
  },
  {
    id: 5,
    title: 'Building Reusable UI Components',
    description: 'Best practices for building reusable and maintainable components in React.',
    image: '/LatestBlog/blog.jpg',
    category: 'UI/UX',
    date: 'June 26, 2025',
    slug: 'reusable-ui-components',
  },
  {
    id: 6,
    title: 'React Performance Optimization',
    description: 'Tips for optimizing performance in large-scale React apps.',
    image: '/LatestBlog/blog.jpg',
    category: 'React',
    date: 'June 25, 2025',
    slug: 'react-performance',
  },
  {
    id: 7,
    title: 'Deploying with Vercel',
    description: 'Step-by-step guide to deploying your Next.js app on Vercel.',
    image: '/LatestBlog/blog.jpg',
    category: 'Deployment',
    date: 'June 24, 2025',
    slug: 'vercel-deployment',
  },
  {
    id: 8,
    title: 'Using Zustand for State Management',
    description: 'How Zustand can be a lightweight alternative to Redux in React apps.',
    image: '/LatestBlog/blog.jpg',
    category: 'React',
    date: 'June 23, 2025',
    slug: 'zustand-state-management',
  },
  {
    id: 9,
    title: 'Responsive Design with TailwindCSS',
    description: 'Creating responsive layouts quickly using TailwindCSS utilities.',
    image: '/LatestBlog/blog.jpg',
    category: 'CSS',
    date: 'June 22, 2025',
    slug: 'responsive-tailwind',
  },
];

const blogsPerPage = 6;

const LatestBlog = ({ variant = 'default' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className={`w-full ${variant === 'overlay' ? '' : 'md:w-[75%]'} p-4 md:p-6`}>
      {/* Section Heading (Shown on all variants) */}
      <div className="flex items-center justify-center mb-8 relative">
        <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <span
            className={`${variant === 'overlay'
                ? 'relative z-10 inline-block px-4 rounded-md py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center'
                : 'relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-[25px]'
              }`}
          >
            <span className={`${variant === 'overlay' ? 'skew-x-[10deg] tracking-wide' : 'skew-x-[10deg] tracking-wide'}`}>
              Latest Blogs
            </span>
          </span>

        </div>
      </div>

      {/* Blog Grid */}
      <div
        className={`grid gap-6 ${variant === 'overlay' ? 'grid-cols-1' : 'md:grid-cols-2 md:gap-y-11'}`}
      >
        {currentBlogs.map((blog) => (
          <div key={blog.id + Math.random()}>
            {variant === 'overlay' ? (
              <div className="relative group rounded-md overflow-hidden shadow-md">
                <Link
                  href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}
                  aria-label={`Read blog titled ${blog.title}`}
                >
                  <div className="relative w-full h-48 md:h-32">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/80 group-hover:bg-black/90 transition duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 top-0 p-4 z-10 text-white">
                      <div className='flex flex-row justify-between text-center items-center'>
                        <p className="text-[11px] px-2 py-1 my-auto rounded-md bg-indigo-600 text-white font-semibold italic tracking-wider skew-x-[-10deg] w-20">
                          {blog.category}
                        </p>
                        <span className='text-[11px] text-left flex justify-end bottom-0'>
                          {blog.date}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold leading-snug mt-7 group-hover:underline">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden bg-white group transition-all">
                <div className="relative w-full h-60 overflow-hidden">
                  <Link href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}>
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    {blog.category} • {blog.date}
                  </p>
                  <Link href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}>
                    <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-700 line-clamp-2">{blog.description}</p>
                  <Link
                    href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}
                    className="inline-block text-indigo-600 font-medium hover:underline mt-2"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination visible on all variants */}
      <div className={`flex justify-center items-center gap-6 mt-8 ${variant === 'overlay' ? 'text-sm' : ''}`}>
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className={`p-2 rounded-full border flex items-center gap-1 transition ${currentPage === 1
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
            }`}
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        <span className="text-gray-600 text-[13px] whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full border flex items-center gap-1 transition ${currentPage === totalPages
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
            }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default LatestBlog;
