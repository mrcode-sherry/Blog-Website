"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const categories = [
  "Technology",
  "Finance",
  "Business",
  "Crypto",
  "Sports",
  "Lifestyle",
  "Health",
  "Fashion",
];

export default function ManageBlogs() {
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const router = useRouter();

  const { data: allBlogs = [], isLoading, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (!data.success) throw new Error("Failed to fetch blogs");
      return data.blogs;
    },
  });

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter(
      (b) => b.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [allBlogs, selectedCategory]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Blog deleted");
        refetch();
      } else alert("Failed to delete blog");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (id) => router.push(`/edit-blog/${id}`);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: d },
    }),
  };

  const SkeletonCard = () => (
    <div className="flex items-center justify-between bg-gray-200 p-4 rounded shadow animate-pulse">
      <div className="flex items-center gap-4 w-full">
        <div className="w-24 h-16 bg-gray-300 rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-2xl font-semibold mb-4"
      >
        Manage Blogs
      </motion.h2>

      {/* Category Filter */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="mb-6"
      >
        <label className="mr-2 font-medium">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </motion.div>

      {/* Blog List */}
      <div className="grid gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredBlogs.length === 0 ? (
          <p>No blogs found in this category.</p>
        ) : (
          filteredBlogs.map((blog, idx) => (
            <motion.div
              key={blog._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1 + idx * 0.05}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={blog.img || "/default.png"}
                  alt="Blog"
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <p className="text-sm text-gray-500">
                    Uploaded: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer duration-300 hover:bg-indigo-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-3 py-1 cursor-pointer duration-300 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
