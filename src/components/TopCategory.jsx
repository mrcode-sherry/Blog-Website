"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import striptags from "striptags";

export default function TopCategory() {
  const [blogs, setBlogs] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/first-blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  // Filter by SEO-favored categories
  const famous = blogs
    .filter(b => ["technology", "health"].includes(b.category))
    .slice(0, 2);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % blogs.length);
  };

  useEffect(() => {
    const t = setInterval(nextSlide, 4000);
    return () => clearInterval(t);
  }, [blogs]);

  if (!blogs.length) {
    return <p className="text-center py-10">Loading...</p>;
  }

  const featured = blogs; // all first-of-category blogs

  return (
    <section className="px-6 md:px-20 py-10 sm:py-14 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-700">
        Featured from Top Categories
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Carousel */}
        <div className="relative w-full lg:w-[70%] h-[300px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={featured[current].img}
                alt={featured[current].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-0" />
              <div className="absolute bottom-0 w-full px-4 sm:px-6 md:px-12 pb-5 pt-24 z-10">
                <span className="text-xs sm:text-sm px-3 py-1 rounded-md bg-indigo-600 text-white font-bold italic skew-x-[-10deg] inline-block">
                  <span className="skew-x-[10deg]">{featured[current].category}</span>
                </span>
                <Link href={`/blog/${featured[current].category}/${featured[current].slug}`}>
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mt-2 hover:underline">
                    {featured[current].title}
                  </h3>
                </Link>
                <p className="text-gray-200 text-sm mt-2 line-clamp-3">
                  {striptags(featured[current].desc)}
                </p>
                <p className="text-xs text-gray-400 mt-2">{featured[current].date}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setCurrent((current - 1 + featured.length) % featured.length)}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white z-20"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent((current + 1) % featured.length)}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white z-20"
          >
            ›
          </button>
        </div>

        {/* Right Side: Famous Blogs */}
        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          {famous.map((b, idx) => (
            <div key={idx} className="border rounded-xl shadow-md overflow-hidden">
              <Link href={`/blog/${b.category}/${b.slug}`}>
                <Image
                  src={b.img}
                  alt={b.title}
                  width={400}
                  height={200}
                  className="w-full h-[180px] object-cover"
                />
              </Link>
              <div className="p-4">
                <p className="text-sm text-gray-500 uppercase">{b.category}</p>
                <h4 className="text-base font-semibold mt-1">
                  <Link href={`/blog/${b.category}/${b.slug}`}>{b.title}</Link>
                </h4>
                <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                  {striptags(b.desc)}
                </p>
                <p className="text-xs text-gray-400 mt-2">{b.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
