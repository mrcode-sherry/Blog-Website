"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrendingBlog from "@/components/TrendingBlog";
import Image from "next/image";
import axios from "axios";
import striptags from "striptags";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        const res = await axios.get(`/api/blog/category/${category}`);
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    if (category) fetchCategoryBlogs();
  }, [category]);

  const featured = blogs[0];
  const remainingBlogs = blogs.slice(1, visibleCount);
  const loadMore = () => setVisibleCount((prev) => prev + 16);

  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-gray-50 text-gray-800">
      {/* Breadcrumb Heading */}
      <section className="bg-gray-100 py-8 sm:py-10 px-4 rounded-md shadow-sm mb-16 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <nav className="text-sm text-gray-600 sm:text-lg space-x-1">
            <Link href="/" className="text-indigo-600 hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-800 font-semibold capitalize">{category}</span>
          </nav>
        </div>
      </section>

      <div className="flex flex-col md:flex-row w-full gap-10">
        {/* Left Section */}
        <section className="w-full lg:w-[70%] space-y-10">
          {/* Section Title */}
          <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">{category} Blogs</h2>
            </span>
          </div>

          {/* Featured Blog */}
          {loading ? (
            <div className="animate-pulse w-full h-[250px] sm:h-[300px] md:h-[450px] bg-gray-300 rounded-lg" />
          ) : (
            featured && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/blogs/${category.toLowerCase()}/${featured.slug}`}>
                  <div className="relative mb-10 rounded-lg group cursor-pointer overflow-hidden shadow-md h-[250px] sm:h-[300px] md:h-[450px]">
                    <Image
                      src={featured.img}
                      alt={featured.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute md:mt-40 mt-8 inset-0 bg-gradient-to-t from-black via-black/90 to-transparent px-4 sm:px-7 pb-6 z-10 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="text-xs sm:text-sm px-4 py-1 rounded-md bg-indigo-600 text-white font-bold italic skew-x-[-10deg]">
                          <span className="skew-x-[10deg] tracking-wider">
                            {featured.category}
                          </span>
                        </span>
                      </div>
                      <h3 className="text-white text-xl sm:text-2xl md:text-[40px] mb-4 font-bold leading-tight hover:underline hover:decoration-blue-500 hover:underline-offset-4 duration-300">
                        {featured.title}
                      </h3>
                      <p className="text-gray-200 text-sm sm:text-base mb-4 leading-relaxed md:line-clamp-3 line-clamp-2">
                        {striptags(featured.desc)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {featured.author} •{" "}
                        {new Date(featured.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          )}

          {/* Grid of Smaller Blogs */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-y-11">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-white p-4 space-y-3 rounded-lg shadow-md"
                  >
                    <div className="h-44 sm:h-52 md:h-56 bg-gray-300 rounded-md" />
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                ))
              : remainingBlogs.map((blog, i) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/blogs/${category.toLowerCase()}/${blog.slug}`}>
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
                          <h4 className="text-base sm:text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-snug">
                            {blog.title}
                          </h4>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {striptags(blog.desc)}
                          </p>
                          <p className="inline-block text-indigo-600 font-medium hover:underline mt-2">
                            Read More →
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>

          {/* Load More */}
          {!loading && visibleCount < blogs.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition flex items-center gap-2 text-sm sm:text-base"
              >
                Load More <ArrowRight size={18} />
              </button>
            </div>
          )}
        </section>

        {/* Right Section (Trending Blogs) */}
        <aside className="w-full lg:w-[30%]">
          <TrendingBlog />
        </aside>
      </div>
    </main>
  );
}
