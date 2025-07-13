'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import LatestBlog from '@/components/LatestBlog';
import BlogGridSection from '@/components/BlogGridSection';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState('');
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const viewCounted = useRef(false);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        const res = await fetch(`/api/blog/slug/${slug}`);
        const data = await res.json();

        if (data.success) {
          const currentBlog = data.blog;
          setBlog(currentBlog);
          setFormattedDate(new Date(currentBlog.createdAt).toLocaleDateString());

          // ✅ Increment view count once
          if (!viewCounted.current) {
            await fetch(`/api/blog/view/${slug}`, { method: 'PUT' });
            viewCounted.current = true;
          }

          // ✅ Fetch all blogs
          const allRes = await fetch('/api/blog');
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
        console.error('Error fetching blog or related blogs:', err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  const validImg =
    blog?.img?.startsWith('/') || blog?.img?.startsWith('http')
      ? blog.img
      : '/LatestBlog/blog.jpg';

  return (
    <div className="px-4 md:px-16 lg:px-24 mt-20">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Blog Content */}
        <div className="flex-1 w-[75%]">
          <p className="text-indigo-600 text-sm font-medium mb-2">
            {blog.category} • {formattedDate} • {blog.views} views
          </p>

          <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

          <div className="mb-6">
            <Image
              src={validImg}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          <div
            className="prose max-w-full blog-content"
            dangerouslySetInnerHTML={{ __html: blog.desc }}
          />
        </div>

        {/* Trending Sidebar */}
        <div className="w-full lg:w-[25%]">
          <LatestBlog variant="overlay" />
        </div>
      </div>

      {/* Blog Grid at Bottom (Filtered by Same Category) */}
      <div className="mt-20">
        <h2 className="text-xl font-bold mb-4">Related {blog.category} Blogs</h2>
        <BlogGridSection blogs={relatedBlogs} />
      </div>
    </div>
  );
}
