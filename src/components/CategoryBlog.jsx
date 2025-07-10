'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

const CategoryBlog = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/blog/category');
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

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
          <div
            key={cat.slug}
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform"
          >
            <Link href={`/blogs/${cat.slug}`}>
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={cat.image || "/LatestBlog/blog.jpg"}
                  alt={cat.category}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
              </div>
            </Link>

            <div className="p-5 space-y-2">
              <Link href={`/blogs/${cat.slug}`}>
                <h3 className="text-xl font-bold text-indigo-700 group-hover:text-indigo-900 transition hover:underline">
                  {cat.category}
                </h3>
              </Link>
              <p className="text-sm text-gray-600">{cat.count} Articles</p>
            </div>

            <div className="absolute bottom-4 right-4">
              <Link
                href={`/blogs/${cat.slug}`}
                className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition shadow-md"
              >
                View Blogs
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBlog;
