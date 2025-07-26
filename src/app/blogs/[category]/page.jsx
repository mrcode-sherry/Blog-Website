import Image from "next/image";
import Link from "next/link";
import striptags from "striptags";
import TrendingBlog from "@/components/TrendingBlog";
import BlogGridSection from "@/components/BlogGridSection";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { ChevronLeft, ChevronRight } from "lucide-react";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function generateMetadata({ params }) {
  const category = params.category;
  return {
  title: `Kintechy | Latest ${capitalize(category)} News Trends and Insights Today`,
  description: `Stay updated with the latest ${category} blogs, insights, expert opinions, and trending news only on Kintechy.`,
  alternates: {
      canonical: `https://kintechy.com/blogs/${category}`,
    },
};

}

export default async function CategoryPage({ params, searchParams }) {
  const category = params.category;
  const page = parseInt(searchParams?.page || "1");
  const limit = 9;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/blog/category/${category}?page=${page}&limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const blogs = data?.blogs;

  if (!data.success || !Array.isArray(blogs)) return notFound();

  const featured = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-gray-50 text-gray-800">
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
        <section className="w-full lg:w-[70%] space-y-10">
          <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">{category} Blogs</h2>
            </span>
          </div>

          {featured && (
            <Link href={`/blogs/${category.toLowerCase()}/${featured.slug}`}>
              <div className="relative mb-10 rounded-lg group cursor-pointer overflow-hidden shadow-md h-[250px] sm:h-[300px] md:h-[450px]">
                <Image
                  src={featured.img || "/default.jpg"}
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
                  <h3 className="text-white text-xl sm:text-2xl md:text-[40px] mb-4 font-bold leading-tight hover:underline hover:decoration-indigo-400 hover:underline-offset-4 duration-300">
                    {featured.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base mb-4 leading-relaxed md:line-clamp-3 line-clamp-2">
                    {striptags(featured.desc)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {featured.author} • {new Date(featured.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          )}

          <BlogGridSection blogs={remainingBlogs} />

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 pt-10">
              {page > 1 && (
                <Link
                  href={`/blogs/${category}?page=${page - 1}`}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow"
                >
                  <ChevronLeft size={18} />
                  Previous
                </Link>
              )}
              <span className="text-indigo-700 font-medium text-sm sm:text-base">
                Page {page} of {data.totalPages}
              </span>
              {page < data.totalPages && (
                <Link
                  href={`/blogs/${category}?page=${page + 1}`}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow"
                >
                  Next
                  <ChevronRight size={18} />
                </Link>
              )}
            </div>
          )}
        </section>

        <aside className="w-full lg:w-[30%]">
          <TrendingBlog />
        </aside>
      </div>
    </main>
  );
}
