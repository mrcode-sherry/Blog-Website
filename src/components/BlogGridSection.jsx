// components/BlogGridSection.jsx
import Link from "next/link";
import Image from "next/image";
import striptags from "striptags";

export default function BlogGridSection({ blogs }) {
  
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">No blogs available.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 md:pb-16 pb-10">
      {blogs.map((blog) => {
        const validImg =
          blog.img?.startsWith("http") ||
          blog.img?.startsWith("/") ||
          blog.img?.startsWith("data:image");

        return (
          <Link
            key={blog._id}
            href={`/blogs/${blog.category?.toLowerCase()}/${blog.slug}`}
          >
            <div className="rounded-lg shadow-xl overflow-hidden bg-white group transition-all">
              {validImg && (
                <div className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden">
                  <Image
                    src={blog.img}
                    alt={blog.title || "Blog Image"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-500">
                  {blog.category} •{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <h4 className="text-gray-800 mb-2 sm:text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h4>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {striptags(blog.desc)}
                </p>
                <span className="inline-block text-indigo-600 font-medium hover:underline mt-2 text-sm">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
