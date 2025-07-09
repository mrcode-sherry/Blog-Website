'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestBlog = ({ variant = 'default' }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page = 1) => {
    try {
      const res = await axios.get(`/api/blog/latest?page=${page}&limit=6`);
      setBlogs(res.data.blogs);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className={`w-full ${variant === 'overlay' ? '' : 'md:w-[75%]'} p-4 md:p-6`}>
      {/* Section Heading */}
      <div className="flex items-center justify-center mb-8 relative">
        <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <span className={`${variant === 'overlay'
            ? 'relative z-10 inline-block px-4 rounded-md py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center'
            : 'relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-[25px]'
          }`}>
            <span className="skew-x-[10deg] tracking-wide">Latest Blogs</span>
          </span>
        </div>
      </div>

      {/* Blog Grid */}
      <div className={`grid gap-6 ${variant === 'overlay' ? 'grid-cols-1' : 'md:grid-cols-2 md:gap-y-11'}`}>
        {blogs.map((blog) => (
          <div key={blog._id}>
            {variant === 'overlay' ? (
              <div className="relative group rounded-md overflow-hidden shadow-md">
                <Link href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}>
                  <div className="relative w-full h-48 md:h-32">
                    <Image
                      src={blog.img}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/80 group-hover:bg-black/90 transition duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 top-0 p-4 z-10 text-white">
                      <div className="flex flex-row justify-between text-center items-center">
                        <p className="text-[11px] px-2 py-1 my-auto rounded-md bg-indigo-600 text-white font-semibold italic tracking-wider skew-x-[-10deg] w-20">
                          {blog.category}
                        </p>
                        <span className="text-[11px] text-left flex justify-end bottom-0">
                          {new Date(blog.createdAt).toLocaleDateString()}
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
                      src={blog.img}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    {blog.category} • {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <Link href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}>
                    <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-700 line-clamp-2">{blog.desc}</p>
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

      {/* Pagination */}
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
