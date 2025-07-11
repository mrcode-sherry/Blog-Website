'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { Eye } from 'lucide-react';


const TrendingBlog = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('/api/blog/trending');
        setTrending(res.data.blogs);
      } catch (err) {
        console.error("Failed to fetch trending blogs", err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <aside className="md:p-5 p-1 md:border-l-[2px] border-gray-300">
      {/* Heading */}
      <div className="mb-10">
        <div className="inline-block bg-indigo-600 text-white text-sm px-4 py-1 rounded-md font-semibold italic skew-x-[-10deg]">
          <span className="skew-x-[10deg] tracking-wider">Trending Blogs</span>
        </div>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-7">
        {trending.map((blog) => (
          <Link
            key={blog._id}
            href={`/blogs/${blog.category.toLowerCase()}/${blog.slug}`}
            className="flex items-start gap-3 group hover:opacity-90 transition-opacity"
          >
            <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={blog.img || '/LatestBlog/blog.jpg'}
                alt={blog.title}
                width={64}
                height={64}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
            </div>

            <div className="flex flex-col justify-between text-sm text-gray-800 leading-tight h-full md:h-20">
              {/* Top Part: Category and Title */}
              <div className=''>
                <p className="text-indigo-600 text-xs font-medium mb-1">
                  {blog.category} • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="font-semibold text-[14px] line-clamp-2 group-hover:text-indigo-600 duration-300">
                  {blog.title}
                </p>
              </div>

              {/* Bottom Part: Views */}
              <div className="flex items-center gap-1 md:mt-0 mt-2 text-gray-500 text-xs">
                <Eye className="w-4 h-4" />
                <span>{blog.views} views</span>
              </div>
            </div>

          </Link>
        ))}
      </div>
    </aside>
  );
};

export default TrendingBlog;
