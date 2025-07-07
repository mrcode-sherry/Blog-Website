'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const featuredBlogs = [
  {
    title: 'Why Choose Lab-Grown Diamond Rings from Vana Jewels?',
    description:
      'When it comes to choosing the perfect ring for your special moments, Vana Jewels offers stunning options at affordable prices. Master MongoDB with indexing strategies, schema design, and real-world performance tips. Enhance your knowledge with deep insights and practical techniques to scale efficiently.',
    category: 'Fashion',
    date: 'July 2, 2025',
    author: 'Umar Awan',
    image: '/latestBlog/blog.jpg',
    slug: 'vana-jewels-diamond-rings',
  },
  {
    title: 'Next.js 15: What’s New & Why It Matters',
    description:
      'Next.js 15 introduces powerful routing, better image handling, and faster builds. Here’s everything you need to know! Understand new features like the app directory, server components, and turbopack optimizations. This guide helps you make the most of the framework’s latest version.',
    category: 'React',
    date: 'June 30, 2025',
    author: 'Zeeshan',
    image: '/latestBlog/blog.jpg',
    slug: 'nextjs-15-features',
  },
  {
    title: 'MongoDB Performance Tips for Large Applications',
    description:
      'Master MongoDB with indexing strategies, schema design, and real-world performance tips. Learn how to optimize queries, reduce latency, and structure your collections for maximum efficiency in large-scale production apps., reduce latency, and structure your collections for maximum efficiency in large-scale production apps., reduce latency, and structure your collections for maximum efficiency in large-scale production apps., reduce latency, and structure your collections for maximum efficiency in large-scale production apps.',
    category: 'MongoDB',
    date: 'June 28, 2025',
    author: 'Ali Khan',
    image: '/latestBlog/blog.jpg',
    slug: 'mongodb-performance-tips',
  },
];

const sideBlogs = [
  {
    id: 1,
    title: 'React Server Components Explained',
    category: 'React',
    date: 'June 29, 2025',
    author: 'Hassam',
    image: '/latestBlog/blog.jpg',
    slug: 'react-server-components',
  },
  {
    id: 2,
    title: 'Secure Your MongoDB Atlas for Production',
    category: 'MongoDB',
    date: 'June 27, 2025',
    author: 'Shan',
    image: '/latestBlog/blog.jpg',
    slug: 'secure-mongodb-atlas',
  },
];

const TopCategory = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % featuredBlogs.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const currentBlog = featuredBlogs[current];

  return (
    <section className="px-4 md:px-20 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Featured from Top Categories
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Blog with Slider */}
        <div className="md:w-[70%] relative rounded-lg overflow-hidden shadow-md h-[300px] md:h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 transition-transform duration-300"
            >
              <Image
                src={currentBlog.image}
                alt={currentBlog.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-0" />

              {/* Text Content */}
              <div className="absolute bottom-0 w-full px-13 pb-6 pt-24 z-10">
                <div className="flex mb-4">
                  <span className="text-sm px-4 py-1 rounded-md bg-indigo-600 text-white font-bold italic skew-x-[-10deg]">
                    <span className="skew-x-[10deg] tracking-wider">{currentBlog.category}</span>
                  </span>
                </div>

                <Link href={`/blog/${currentBlog.category.toLowerCase()}/${currentBlog.slug}`}>
                  <h3 className="text-white text-[40px] mb-4 font-bold leading-tight hover:underline hover:decoration-blue-500 hover:underline-offset-4 duration-300">
                    {currentBlog.title}
                  </h3>
                </Link>

                <p className="text-gray-200 text-sm mb-3 leading-relaxed line-clamp-3">
                  {currentBlog.description}
                </p>
                <p className="text-xs text-gray-400">
                  {currentBlog.author} • {currentBlog.date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition z-20"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition z-20"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Blogs */}
        <div className="md:w-[30%] flex flex-col gap-4">
          {sideBlogs.map((blog) => (
            <div
              key={blog.id}
              className="relative rounded-lg overflow-hidden shadow-md group transition-all"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={200}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t group from-black via-black/70 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[11px] px-2 py-1 my-auto rounded-md bg-indigo-600 text-white font-semibold italic tracking-wider skew-x-[-10deg] w-20 text-center">
                  {blog.category}
                </span>
                <Link href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}>
                  <h4 className="text-white hover:underline mb-1 font-semibold leading-snug group-hover:underline">
                    {blog.title}
                  </h4>
                </Link>
                <p className="text-xs text-gray-300">{blog.author} • {blog.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategory;
