"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrendingBlog from "@/components/TrendingBlog";
import Image from "next/image";
import axios from "axios";

export default function CategoryPage() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(17);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        const res = await axios.get(`/api/blog/category/${category}`);
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
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
      <section className="bg-gray-100 py-8 sm:py-10 px-4 rounded-md shadow-sm mb-16 mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <nav className="text-sm text-gray-600 text-base sm:text-lg space-x-1">
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
          {featured && (
            <Link href={`/blogs/${category.toLowerCase()}/${featured.slug}`}>
              <div className="relative mb-10 rounded-lg group cursor-pointer overflow-hidden shadow-md h-[250px] sm:h-[300px] md:h-[450px]">
                <Image
                  src={featured.image || "/LatestBlog/blog.jpg"}
                  alt={featured.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute md:mt-40 mt-8 inset-0 bg-gradient-to-t from-black via-black/90 to-transparent px-4 sm:px-7 pb-6 z-10 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-xs sm:text-sm px-4 py-1 rounded-md bg-indigo-600 text-white font-bold italic skew-x-[-10deg]">
                      <span className="skew-x-[10deg] tracking-wider">{featured.category}</span>
                    </span>
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl md:text-[40px] mb-4 font-bold leading-tight hover:underline hover:decoration-blue-500 hover:underline-offset-4 duration-300">
                    {featured.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base mb-6 leading-relaxed md:line-clamp-3 line-clamp-2">
                    {featured.desc}
                  </p>
                  <p className="text-xs text-gray-400">
                    {featured.author} • {new Date(featured.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Grid of Smaller Blogs */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-y-11">
            {remainingBlogs.map((blog) => (
              <Link key={blog._id} href={`/blogs/${category.toLowerCase()}/${blog.slug}`}>
                <div className="rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden bg-white group transition-all">
                  <div className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden">
                    <Image
                      src={blog.image || "/LatestBlog/blog.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-500">
                      {blog.category} • {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <h4 className="text-base sm:text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-snug">
                      {blog.title}
                    </h4>
                    <p className="text-sm text-gray-700 line-clamp-2">{blog.description}</p>
                    <Link
                      href={`/blog/${blog.category.toLowerCase()}/${blog.slug}`}
                      className="inline-block text-indigo-600 font-medium hover:underline mt-2"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < blogs.length && (
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

        {/* Right Section (Unchanged) */}
        <aside className="w-full lg:w-[30%]">
          <TrendingBlog />
        </aside>
      </div>
    </main>
  );
}
