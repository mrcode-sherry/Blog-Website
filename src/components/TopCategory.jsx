"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import striptags from "striptags";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TopCategory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const hasAnimated = useRef(false);

  const topCategories = ["technology", "health"];

  // ✅ TanStack React Query fetch
  const { data: blogs = [], isLoading: loading } = useQuery({
    queryKey: ["topCategoriesBlogs"],
    queryFn: async () => {
      const res = await axios.get("/api/blog/first-blogs");
      return res.data.blogs || res.data;
    },
  });

  const featured = blogs.filter(
    (blog, index, self) =>
      self.findIndex((b) => b.category === blog.category) === index
  );

  const famous = topCategories
    .map((cat) => blogs.find((b) => b.category?.toLowerCase() === cat))
    .filter(Boolean)
    .slice(0, 2);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (container) {
      const width = container.offsetWidth;
      container.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();

    intervalRef.current = setInterval(() => {
      const container = containerRef.current;
      if (!container || featured.length === 0) return;

      const nextIndex = currentIndex + 1;

      if (nextIndex >= featured.length) {
        container.scrollTo({
          left: 0,
          behavior: "auto",
        });
        setCurrentIndex(0);
      } else {
        scrollToIndex(nextIndex);
      }
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!loading && featured.length > 0) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [currentIndex, featured.length, loading]);

  const handleManualScroll = (direction) => {
    let newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = featured.length - 1;
    if (newIndex >= featured.length) newIndex = 0;
    scrollToIndex(newIndex);
  };

  return (
    <div className="w-full flex flex-col md:flex-row px-4 sm:px-6 md:px-20 gap-6 py-8 bg-white overflow-hidden">
      {/* Left: Featured Top Categories */}
      <div className="w-full md:w-2/3 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center mb-8 w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300"
        >
          <span className="relative z-10 inline-block rounded-md px-4 py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-2xl">
            <span className="skew-x-[10deg] tracking-wide">
              Featured Top Categories
            </span>
          </span>
        </motion.div>

        {loading ? (
          <div className="w-full h-[300px] sm:h-[470px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
        ) : (
          <motion.div
            initial={!hasAnimated.current ? { opacity: 0, y: 40 } : false}
            whileInView={!hasAnimated.current ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
            onAnimationComplete={() => (hasAnimated.current = true)}
            className="relative overflow-hidden rounded-xl group"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
          >
            <div
              ref={containerRef}
              className="flex overflow-x-scroll no-scrollbar snap-x snap-mandatory transition-transform duration-700 ease-in-out"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {featured.map((blog, idx) => (
                <div
                  key={idx}
                  className="relative w-full flex-shrink-0 h-[300px] sm:h-[470px] snap-start rounded-xl overflow-hidden shadow-md"
                >
                  <Link href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}>
                    <div className="relative w-full h-full">
                      <Image
                        src={blog.img || "/default.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized={blog.img?.startsWith("data:image")}
                      />
                      <div className="absolute md:mt-40 mt-8 inset-0 bg-gradient-to-t from-black via-black/90 to-transparent md:px-12 px-7 pb-6 z-10 flex flex-col justify-center">
                        <div className="mb-4">
                          <span className="text-xs sm:text-sm px-4 py-1 rounded-md bg-indigo-600 text-white font-bold italic skew-x-[-10deg]">
                            <span className="skew-x-[10deg] tracking-wider">
                              {blog.category}
                            </span>
                          </span>
                        </div>
                        <h3 className="text-white text-xl sm:text-2xl md:text-[37px] mb-4 font-bold leading-tight hover:underline hover:decoration-blue-500 hover:underline-offset-4 duration-300">
                          {blog.title}
                        </h3>
                        <p className="text-gray-200 text-sm sm:text-base mb-4 leading-relaxed md:line-clamp-3 line-clamp-2">
                          {striptags(blog.desc)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {blog.author} • {blog.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Scroll Buttons */}
            <button
              onClick={() => handleManualScroll("left")}
              className="hidden md:block absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer text-white p-2 rounded-full z-10 hover:bg-gray-700"
            >
              ◀
            </button>
            <button
              onClick={() => handleManualScroll("right")}
              className="hidden md:block absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-white p-2 rounded-full z-10 hover:bg-gray-700"
            >
              ▶
            </button>
          </motion.div>
        )}
      </div>

      {/* Right: Famous Blogs */}
      <div className="w-full md:w-1/3 space-y-6 mt-4 md:mt-20">
        {(loading ? Array(2).fill({}) : famous).map((b, idx) => (
          <motion.div
            key={idx}
            initial={!hasAnimated.current ? { opacity: 0, y: 30 } : false}
            whileInView={!hasAnimated.current ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 1, delay: 0.5 + idx * 0.3 }}
            viewport={{ once: true }}
            onAnimationComplete={() => (hasAnimated.current = true)}
            className="relative h-[222px] rounded-xl overflow-hidden shadow-md"
          >
            {loading ? (
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
            ) : (
              <Link href={`/blogs/${b.category.toLowerCase()}/${b.slug}`}>
                <div className="relative w-full h-full">
                  <Image
                    src={b.img || "/default.jpg"}
                    alt={b.title}
                    fill
                    className="object-cover"
                    unoptimized={b.img?.startsWith("data:image")}
                  />
                  <div className="absolute md:mt-20 mt-8 inset-0 bg-gradient-to-t from-black via-black/90 to-transparent md:px-6 px-7 pb-6 z-10 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="text-xs sm:text-sm px-4 py-1 rounded-md bg-indigo-600 text-white font-bold italic skew-x-[-10deg]">
                        <span className="skew-x-[10deg] tracking-wider">
                          {b.category}
                        </span>
                      </span>
                    </div>
                    <h2 className="text-white text-xl sm:text-2xl md:text-[20px] mb-4 font-bold leading-tight hover:underline hover:decoration-blue-500 hover:underline-offset-4 duration-300">
                      {b.title}
                    </h2>
                    <p className="text-xs text-gray-300 mt-1">{b.date}</p>
                  </div>
                </div>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
