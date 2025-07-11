"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const featuredBlogs = [
  {
    title: "Why Choose Lab-Grown Diamond Rings from Vana Jewels?",
    description:
      "When it comes to choosing the perfect ring for your special moments, Vana Jewels offers stunning options at affordable prices. Discover elegant styles with ethical sourcing and timeless brilliance.When it comes to choosing the perfect ring for your special moments, Vana Jewels offers stunning options at affordable prices. Discover elegant styles with ethical sourcing and timeless brilliance.",
    category: "Fashion",
    date: "July 2, 2025",
    author: "Umar Awan",
    image: "/latestBlog/blog.jpg",
    slug: "vana-jewels-diamond-rings",
  },
  {
    title: "Next.js 15: What’s New & Why It Matters",
    description:
      "Next.js 15 introduces powerful routing, better image handling, and faster builds. Learn about server components, app directory, and how to harness these tools for scalable applications.When it comes to choosing the perfect ring for your special moments, Vana Jewels offers stunning options at affordable prices. Discover elegant styles with ethical sourcing and timeless brilliance.",
    category: "React",
    date: "June 30, 2025",
    author: "Zeeshan",
    image: "/latestBlog/blog.jpg",
    slug: "nextjs-15-features",
  },
  {
    title: "MongoDB Performance Tips for Large Applications",
    description:
      "Master MongoDB with indexing strategies, schema design, and real-world performance tips. Learn to optimize queries and reduce latency in high-traffic environments.When it comes to choosing the perfect ring for your special moments, Vana Jewels offers stunning options at affordable prices. Discover elegant styles with ethical sourcing and timeless brilliance.",
    category: "MongoDB",
    date: "June 28, 2025",
    author: "Ali Khan",
    image: "/latestBlog/blog.jpg",
    slug: "mongodb-performance-tips",
  },
];

const sideBlogs = [
  {
    id: 1,
    title: "React Server Components Explained",
    category: "React",
    date: "June 29, 2025",
    author: "Hassam",
    image: "/latestBlog/blog.jpg",
    slug: "react-server-components",
  },
  {
    id: 2,
    title: "Secure Your MongoDB Atlas for Production",
    category: "MongoDB",
    date: "June 27, 2025",
    author: "Shan",
    image: "/latestBlog/blog.jpg",
    slug: "secure-mongodb-atlas",
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
  if (!currentBlog) return null;

  return (
    <section className="px-6 md:px-20 py-10 sm:py-14 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-700">
        Featured from Top Categories
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Slider */}
        <div className="relative rounded-lg overflow-hidden shadow-md w-full md:w-[70%] h-[280px] sm:h-[350px] md:h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={currentBlog.image}
                alt={currentBlog.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-0" />

              {/* Content */}
              <div className="absolute bottom-0 w-full px-4 sm:px-6 md:px-12 pb-5 pt-24 z-10">
                <div className="mb-3">
                  <span className="text-xs sm:text-sm px-3 py-1 rounded-md bg-indigo-600 text-white font-bold italic skew-x-[-10deg] inline-block">
                    <span className="skew-x-[10deg] tracking-wider">
                      {currentBlog.category}
                    </span>
                  </span>
                </div>

                <Link href={`/blog/${currentBlog.category.toLowerCase()}/${currentBlog.slug}`}>
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight hover:underline hover:decoration-indigo-400 hover:underline-offset-4 transition">
                    {currentBlog.title}
                  </h3>
                </Link>

                <p className="text-gray-200 text-sm mt-2 line-clamp-3">
                  {currentBlog.description}
                </p>

                <p className="text-xs text-gray-400 mt-2">
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

        {/* Right: Side Blogs */}
        <div className="w-full md:w-[30%] flex flex-col gap-4">
          {sideBlogs.map((blog) => (
            <div
              key={blog.id}
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={200}
                className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs px-2 py-1 rounded-md bg-indigo-600 text-white font-semibold italic tracking-wider skew-x-[-10deg] w-20 text-center">
                  {blog.category}
                </span>
                <Link href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}>
                  <h4 className="text-white font-semibold text-sm sm:text-base mt-1 leading-snug hover:underline">
                    {blog.title}
                  </h4>
                </Link>
                <p className="text-xs text-gray-300 mt-1">
                  {blog.author} • {blog.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategory;
