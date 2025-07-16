"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import striptags from "striptags";

export default function TopCategory() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const topCategories = ["technology", "health"];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/first-blogs");
        const data = await res.json();
        setBlogs(data.blogs || data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs", err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
      const nextIndex = (currentIndex + 1) % featured.length;
      scrollToIndex(nextIndex);
    }, 5000); // 5 seconds
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (featured.length > 0) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [currentIndex, featured.length]);

  const handleManualScroll = (direction) => {
    let newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = featured.length - 1;
    if (newIndex >= featured.length) newIndex = 0;
    scrollToIndex(newIndex);
  };

  if (loading) return <p className="text-center">Loading blogs...</p>;
  if (!blogs || blogs.length === 0) return <p className="text-center">No blogs found.</p>;

  return (
    <div className="w-full flex flex-col md:flex-row px-6 md:px-20 gap-6 py-8 bg-white">
      {/* Left: Featured Top Categories */}
      <div className="w-full md:w-2/3 relative">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Featured Top Categories</h2>
        <div
          className="relative overflow-hidden rounded-xl group"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          <div
            ref={containerRef}
            className="flex transition-transform duration-700 ease-in-out overflow-hidden no-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >
            {featured.map((blog, idx) => (
              <div
                key={idx}
                className="relative w-full flex-shrink-0 h-[500px] scroll-snap-align-start rounded-xl overflow-hidden shadow-md"
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={blog.img || "/default.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized={blog.img?.startsWith("data:image")}
                    />
                  </div>
                   <div className="absolute inset-0 bg-black/60 hover:bg-black/70 hover:backdrop-blur-sm duration-300 p-4 flex flex-col justify-end text-white">
                      <p className="text-xs uppercase">{blog.category}</p>
                      <h2 className="text-lg font-semibold">{blog.title}</h2>
                      <p className="text-sm">{striptags(blog.desc).slice(0, 100)}...</p>
                      <p className="text-xs text-gray-300 mt-1">{blog.date}</p>
                    </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Scroll Buttons */}
          <button
            onClick={() => handleManualScroll("left")}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
          >
            ◀
          </button>
          <button
            onClick={() => handleManualScroll("right")}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Right: Famous Blogs */}
      <div className="w-full md:w-1/3 space-y-6 pt-12 md:pt-0">
        {famous.map((b, idx) => (
          <div
            key={idx}
            className="relative h-[250px] rounded-xl overflow-hidden shadow-md"
          >
            <Link href={`/blog/${b.slug}`}>
              <div className="relative w-full h-full">
                <Image
                  src={b.img || "/default.jpg"}
                  alt={b.title}
                  fill
                  className="object-cover"
                  unoptimized={b.img?.startsWith("data:image")}
                />
                <div className="absolute inset-0 bg-black/60 duration-300 hover:bg-black/70 p-4 flex flex-col justify-end text-white">
                  <p className="text-xs uppercase">{b.category}</p>
                  <h2 className="text-base font-semibold">{b.title}</h2>
                  <p className="text-sm">{striptags(b.desc).slice(0, 80)}...</p>
                  <p className="text-xs text-gray-300 mt-1">{b.date}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
