"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import LatestBlog from "@/components/LatestBlog";
import BlogGridSection from "@/components/BlogGridSection";
import { Eye } from "lucide-react";
import striptags from "striptags";
import { motion } from "framer-motion";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        const res = await fetch(`/api/blog/slug/${slug}`);
        const data = await res.json();

        if (data.success) {
          const currentBlog = data.blog;
          setBlog(currentBlog);
          setFormattedDate(
            new Date(currentBlog.createdAt).toLocaleDateString()
          );

          const allRes = await fetch("/api/blog");
          const allData = await allRes.json();

          if (allData.success) {
            const filtered = allData.blogs.filter(
              (b) => b.category === currentBlog.category && b._id !== currentBlog._id
            );
            setRelatedBlogs(filtered);
          }
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error("Error fetching blog or related blogs:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [slug]);

  /* prevent double‑count views */
  useEffect(() => {
    if (!blog || !slug) return;
    const viewKey = `viewed-${slug}`;
    if (sessionStorage.getItem(viewKey)) return;

    const timer = setTimeout(() => {
      fetch(`/api/blog/view/${slug}`, { method: "PUT" })
        .then(() => sessionStorage.setItem(viewKey, "true"))
        .catch((err) => console.error("Failed to increment view:", err));
    }, 500);

    return () => clearTimeout(timer);
  }, [blog?._id]);

  /* ------------------- Loading skeleton ------------------- */
  if (loading)
    return (
      <div className="px-6 md:px-20 pt-28 sm:pt-32 bg-white">
        <div className="animate-pulse space-y-5 pb-12">
          <div className="h-5 w-24 bg-gray-300 rounded"></div>
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-64 w-full bg-gray-300 rounded"></div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );

  if (!blog)
    return <p className="text-center mt-10 text-sm">Blog not found.</p>;

  const showImage =
    blog?.img?.startsWith("/") ||
    blog?.img?.startsWith("http") ||
    blog?.img?.startsWith("data:image");

  /* simple fade+slide */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: d },
    }),
  };

  return (
    <div className="md:px-20 px-6 pt-28 sm:pt-32 bg-white">
      {/* ------- Desktop / large layout ------- */}
      <div className="hidden md:flex gap-8">
        {/* Main Blog */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-[75%]"
        >
          <span className="relative z-10 rounded-md inline-block px-3 py-1 mb-3 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-base sm:text-lg md:text-[17px]">
            <h2 className="skew-x-[10deg] tracking-wide capitalize">
              {blog.category}
            </h2>
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-black leading-snug">
            {blog.title}
          </h1>

          <p className="text-indigo-600 text-xs sm:text-sm font-medium mb-4 flex items-center gap-2">
            {formattedDate} •
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {blog.views} views
            </span>
          </p>

          {showImage && (
            <div className="mb-6 sm:mb-10">
              <Image
                src={blog.img}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          )}

          <p className="text-base text-black leading-relaxed whitespace-pre-line">
            {striptags(blog.desc)}
          </p>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="w-[25%]"
        >
          <LatestBlog variant="overlay" />
        </motion.div>
      </div>

      {/* ------- Mobile layout ------- */}
      <div className="md:hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className=""
        >
          <span className="relative z-10 rounded-md inline-block px-3 py-1 mb-3 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-base">
            <h2 className="skew-x-[10deg] tracking-wide capitalize">
              {blog.category}
            </h2>
          </span>

          <h1 className="text-2xl font-bold mb-3 text-black leading-snug">
            {blog.title}
          </h1>

          <p className="text-indigo-600 text-xs font-medium mb-4 flex items-center gap-2">
            {formattedDate} •
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {blog.views} views
            </span>
          </p>

          {showImage && (
            <div className="mb-6">
              <Image
                src={blog.img}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          )}

          <p className="text-base text-black leading-relaxed whitespace-pre-line">
            {striptags(blog.desc)}
          </p>
        </motion.div>

        {/* Related (mobile) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mt-10"
        >
          <div className="flex items-center justify-center mb-8 relative">
            <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
              <span className="relative z-10 inline-block rounded-md px-4 py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-2xl">
                <span className="skew-x-[10deg] tracking-wide">Related {blog.category} Blogs</span>
              </span>
            </div>
          </div>
          <BlogGridSection blogs={relatedBlogs} />
        </motion.div>

        {/* Latest (mobile) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="md:mt-10"
        >
          <LatestBlog variant="overlay" />
        </motion.div>
      </div>

      {/* Related (desktop) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
        className="hidden md:block md:mt-10 mt-20"
      >
        <div className="flex items-center justify-center mb-8 relative">
          <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <span className="relative z-10 inline-block rounded-md px-4 py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-2xl">
              <span className="skew-x-[10deg] tracking-wide">Related {blog.category} Blogs</span>
            </span>
          </div>
        </div>
        <BlogGridSection blogs={relatedBlogs} />
      </motion.div>
    </div>
  );
}
