// components/BlogGridSection.jsx
import Link from "next/link";
import Image from "next/image";

export default function BlogGridSection({ blogs }) {
  console.log("🔍 Received blogs in BlogGridSection:", blogs);

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">No blogs available.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 pb-16">
      {blogs.map((blog) => (
        <Link
          key={blog._id}
          href={`/blogs/${blog.category?.toLowerCase()}/${blog.slug}`}
        >
          <div className="rounded-lg shadow-xl overflow-hidden bg-white group transition-all">
            <div className="relative w-full h-44 sm:h-52 md:h-56">
              <Image
                src={
                  blog.img?.startsWith("http") || blog.img?.startsWith("/")
                    ? blog.img
                    : "/LatestBlog/blog.jpg"
                }
                alt={blog.title || "Blog Image"}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">
                {blog.category} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <h4 className="text-base text-black font-semibold group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                {blog.title}
              </h4>
              <p className="text-sm text-gray-700 line-clamp-2">
                {blog.metadesc}
              </p>
              <span className="text-indigo-600 text-sm hover:underline font-medium">
                Read More →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
