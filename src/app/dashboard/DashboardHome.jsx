"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const fetchStats = async () => {
  const res = await fetch("/api/dashboard/summary");
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || "Failed to fetch");
  return data.data;
};

const DashboardHome = () => {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: d },
    }),
  };

  /* ---------------- Skeleton ---------------- */
  if (isLoading)
    return (
      <div className="space-y-10 animate-pulse">
        {/* heading */}
        <div className="h-8 w-56 bg-gray-300 rounded" />
        <div className="h-4 w-64 bg-gray-200 rounded" />

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-300 h-24 rounded-lg" />
          ))}
        </div>

        {/* lists */}
        <div className="space-y-4">
          <div className="h-6 w-40 bg-gray-300 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );

  if (isError || !stats)
    return (
      <p className="text-center text-sm text-red-600">Failed to load data.</p>
    );

  /* ---------------- Dashboard ---------------- */
  return (
    <div className="space-y-10">
      {/* Heading */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Welcome Admin 👋
        </h1>
        <p className="text-gray-600">
          Here's an overview of your blog performance today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card title="Total Views" value={stats.views} />
        <Card title="Traffic" value={stats.traffic} />
        <Card title="Total Blogs" value={stats.blogs} />
      </motion.div>

      {/* Blogs by Category */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Blogs by Category
        </h2>
        <ul className="space-y-3">
          {stats.blogsByCategory.map((item) => (
            <li
              key={item.category}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-medium text-gray-700">{item.category}</span>
              <span className="text-indigo-600 font-bold">{item.count}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

/* Stat Card Component */
const Card = ({ title, value }) => (
  <div className="bg-indigo-600 text-white p-5 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-1">{title}</h2>
    <p className="text-3xl font-bold">{value.toLocaleString()}</p>
  </div>
);

export default DashboardHome;
