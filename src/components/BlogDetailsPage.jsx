'use client';

import Image from "next/image";
import LatestBlog from "@/components/LatestBlog";
import BlogGridSection from "@/components/BlogGridSection";
import ViewCounter from "@/components/ViewCounter";
import { Eye } from "lucide-react";

export default function BlogDetailsPage({ blog, relatedBlogs }) {
  if (!blog) return <p className="text-center mt-10 text-sm">Blog not found.</p>;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString();

  const showImage =
    blog?.img?.startsWith("/") ||
    blog?.img?.startsWith("http") ||
    blog?.img?.startsWith("data:image");

  const blogContentClass =
    "text-base text-black leading-relaxed space-y-4 " +
    "[&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h3]:text-lg sm:[&_h3]:text-xl " +
    "[&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6 " +
    "[&_p]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic " +
    "[&_img]:rounded-lg [&_img]:shadow-md";

  return (
    <div className="md:px-20 px-6 pt-28 sm:pt-32 bg-white">
      <ViewCounter slug={blog.slug} />

      <div className="md:flex md:gap-8">
        {/* Left Side: Blog content + related */}
        <div className="md:w-[70%] w-full">
          <div className="max-w-4xl mx-auto md:mx-0">
            <span className="inline-block px-3 py-1 mb-3 bg-indigo-600 text-white font-bold italic skew-x-[-10deg]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize text-sm sm:text-base">
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

            <div
              className={blogContentClass}
              dangerouslySetInnerHTML={{ __html: blog.desc }}
            />
          </div>

          {relatedBlogs?.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-center mb-8 relative">
                <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                  <span className="relative z-10 inline-block rounded-md px-4 py-2 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-2xl">
                    <span className="skew-x-[10deg] tracking-wide">
                      Related {blog.category} Blogs
                    </span>
                  </span>
                </div>
              </div>
              <BlogGridSection blogs={relatedBlogs} />
            </div>
          )}
        </div>

        {/* Right Side: Latest blog */}
        <div className="md:w-[30%]">
          <LatestBlog variant="overlay" />
        </div>
      </div>
    </div>
  );
}
