'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const CategoryBlog = () => {
  const { data: categories = [], isLoading: loading } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: async () => {
      const res = await axios.get('/api/blog/category');
      return res.data.categories;
    },
  });

  return (
    <section className="px-6 md:px-20 py-10 sm:py-14 bg-white">
      {/* Section Heading */}
      <div className="flex items-center justify-center mb-8 relative">
        <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <span className="relative z-10 inline-block rounded-md px-4 py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-2xl">
            <span className="skew-x-[10deg] tracking-wide">Blogs Category</span>
          </span>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse space-y-4 p-4 rounded-lg shadow-md">
                <div className="h-48 bg-gray-300 rounded-md" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-8 w-24 bg-gray-300 rounded-md ml-auto" />
              </div>
            ))
          : categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blogs/${cat.slug}`}>
                  <div className="relative w-full h-48 sm:h-52 md:h-60 overflow-hidden">
                    <Image
                      src={cat.image || "/LatestBlog/blog.jpg"}
                      alt={cat.category}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent group-hover:opacity-80 transition duration-300" />
                  </div>
                </Link>

                <div className="p-4 sm:p-5 space-y-1 sm:space-y-2">
                  <Link href={`/blogs/${cat.slug}`}>
                    <h3 className="text-lg sm:text-xl font-bold text-indigo-700 group-hover:text-indigo-900 transition hover:underline">
                      {cat.category}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">{cat.count} Articles</p>
                </div>

                <div className="absolute bottom-3 right-3">
                  <Link
                    href={`/blogs/${cat.slug}`}
                    className="text-xs sm:text-sm bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-indigo-700 transition shadow-md"
                  >
                    View Blogs
                  </Link>
                </div>
              </motion.div>
            ))}
      </div>
    </section>
  );
};

export default CategoryBlog;
