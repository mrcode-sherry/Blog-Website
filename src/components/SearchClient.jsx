"use client";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import striptags from "striptags";
import LatestBlog from "@/components/LatestBlog";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ITEMS_PER_PAGE = 8;
const skeletonArray = Array.from({ length: 6 });

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["searchBlogs", query],
    queryFn: async () => {
      const res = await axios.get(`/api/blog/search?q=${query}`);
      return res.data.blogs;
    },
    enabled: !!query, // only run query if `query` is truthy
  });

  const blogs = data || [];
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedBlogs = useMemo(
    () => blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [blogs, startIndex]
  );

  return (
    <main className="px-6 md:px-20 py-12 md:mt-20 mt-16 bg-white">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:text-3xl text-2xl font-bold md:mb-10 mb-6 text-black"
      >
        Search Results for:{" "}
        <span className="text-indigo-600 capitalize">{query}</span>
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="w-full lg:w-[75%] space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skeletonArray.map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] bg-white"
                >
                  <div className="h-44 sm:h-52 md:h-56 w-full bg-gray-300 rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedBlogs.length === 0 ? (
            <p className="text-black">No blogs match your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paginatedBlogs.map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}
                  >
                    <div className="rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden bg-white group transition-all">
                      <div className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden">
                        <Image
                          src={blog.img}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <p className="text-sm text-gray-500">
                          {blog.category} •{" "}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <h4 className="text-base text-gray-800 sm:text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-snug">
                          {blog.title}
                        </h4>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {striptags(blog.desc)}
                        </p>
                        <p className="inline-block text-indigo-600 font-medium hover:underline mt-2 text-sm">
                          Read More →
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex gap-2 mt-6 justify-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full lg:w-[25%]"
        >
          <LatestBlog variant="overlay" />
        </motion.aside>
      </div>
    </main>
  );
}
