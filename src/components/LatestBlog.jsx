"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import striptags from "striptags";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const skeletonArray = new Array(6).fill(null);

const LatestBlog = ({ variant = "default" }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["latestBlogs", currentPage],
    queryFn: async () => {
      const res = await axios.get(`/api/blog/latest?page=${currentPage}&limit=6`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const blogs = data?.blogs || [];
  const totalPages = data?.totalPages || 1;

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className={`w-full overflow-hidden ${variant === "overlay" ? "" : ""} md:px-10 py-10`}>
      {/* Heading */}
      <div className="flex items-center justify-center mb-8 relative">
        <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <span
            className={`${
              variant === "overlay"
                ? "relative z-10 inline-block px-4 rounded-md py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center"
                : "relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-[20px] sm:text-[25px]"
            }`}
          >
            <span className="skew-x-[10deg] tracking-wide">Latest Blogs</span>
          </span>
        </div>
      </div>

      {/* Blog Grid */}
      <div
        className={`grid gap-6 ${
          variant === "overlay"
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-y-11"
        }`}
      >
        {isLoading
          ? skeletonArray.map((_, index) => (
              <div
                key={index}
                className="animate-pulse space-y-4 bg-gray-100 rounded-md p-4 shadow"
              >
                <div className="w-full h-44 sm:h-52 bg-gray-300 rounded-md" />
                <div className="h-4 w-2/3 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
              </div>
            ))
          : blogs.map((blog, index) => {
              const validImg = blog?.img;
              if (!validImg) return null;

              return (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {variant === "overlay" ? (
                    <div className="relative group rounded-md overflow-hidden shadow-md">
                      <Link href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}>
                        <div className="relative w-full h-44 md:h-32">
                          <Image
                            src={validImg}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/80 transition duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 top-0 p-4 z-10 text-white">
                            <div className="flex flex-row justify-between text-center items-center">
                              <p className="text-[10px] sm:text-[11px] px-2 py-1 my-auto rounded-md bg-indigo-600 text-white font-semibold italic tracking-wider skew-x-[-10deg] w-20">
                                {blog.category}
                              </p>
                              <span className="text-[10px] sm:text-[11px]">
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="md:text-sm text-[23px] font-semibold leading-snug md:mt-6 mt-8 group-hover:underline line-clamp-2">
                              {blog.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div className="rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden bg-white group transition-all">
                      <div className="relative w-full h-52 sm:h-60 overflow-hidden">
                        <Link href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}>
                          <Image
                            src={validImg}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                      </div>
                      <div className="p-4 space-y-2">
                        <p className="text-xs sm:text-sm text-gray-500">
                          {blog.category} • {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <Link href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}>
                          <h3 className="text-gray-800 mb-2 sm:text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                            {blog.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {striptags(blog.desc)}
                        </p>
                        <Link
                          href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}
                          className="inline-block text-indigo-600 font-medium hover:underline mt-2 text-sm"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
      </div>

      {/* Pagination */}
      <div
        className={`flex justify-center items-center gap-3 mt-10 ${
          variant === "overlay" ? "text-sm flex-nowrap" : "flex-wrap"
        } whitespace-nowrap`}
      >
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className={`py-2 px-2 md:px-3 cursor-pointer rounded-full border flex items-center gap-1 transition text-sm ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-indigo-600 border-indigo-600 hover:bg-indigo-100"
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
          className={`py-2 px-2 md:px-3 rounded-full cursor-pointer border flex items-center gap-1 transition text-sm ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-indigo-600 border-indigo-600 hover:bg-indigo-100"
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
