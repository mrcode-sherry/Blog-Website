"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

const TrendingBlog = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("/api/blog/trending");
        setTrending(res.data.blogs);
      } catch (err) {
        console.error("Failed to fetch trending blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const SkeletonCard = () => (
    <div className="flex items-start gap-3 animate-pulse">
      <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
      <div className="flex flex-col justify-between h-20 w-full">
        <div className="w-3/4 h-3 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-3 bg-gray-300 rounded mb-1"></div>
        <div className="w-2/5 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <aside className="md:p-5 p-1 md:border-l-[2px] border-gray-300 overflow-hidden">
      {/* Heading */}
      <div className="mb-10">
        <div className="inline-block bg-indigo-600 text-white text-sm px-4 py-1 rounded-md font-semibold italic skew-x-[-10deg]">
          <span className="skew-x-[10deg] tracking-wider">Trending Blogs</span>
        </div>
      </div>

      {/* Blog List or Skeleton */}
      <div className="flex flex-col gap-7">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : trending.map((blog, index) => {
              const validImg = blog?.img;
              if (!validImg) return null;

              return (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}
                    className="flex items-start gap-3 group hover:opacity-90 transition-opacity"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={validImg}
                        alt={blog.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                    </div>

                    <div className="flex flex-col justify-between text-sm text-gray-800 leading-tight h-full md:h-20">
                      <div>
                        <p className="text-indigo-600 text-xs font-medium mb-1">
                          {blog.category} •{" "}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-[14px] line-clamp-2 group-hover:text-indigo-600 duration-300">
                          {blog.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 md:mt-0 mt-2 text-gray-500 text-xs">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views} views</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
      </div>
    </aside>
  );
};

export default TrendingBlog;
