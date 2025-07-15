'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import LatestBlog from '@/components/LatestBlog';
import BlogGridSection from '@/components/BlogGridSection';
import { Eye } from 'lucide-react';
import striptags from 'striptags';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState('');
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        const res = await fetch(`/api/blog/slug/${slug}`);
        const data = await res.json();

        if (data.success) {
          const currentBlog = data.blog;
          setBlog(currentBlog);
          setFormattedDate(new Date(currentBlog.createdAt).toLocaleDateString());

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

  // ✅ CORRECTED: Avoid double view count on first load
  useEffect(() => {
    if (!blog || !slug) return;

    const viewKey = `viewed-${slug}`;
    const alreadyViewed = sessionStorage.getItem(viewKey);

    if (!alreadyViewed) {
      const timer = setTimeout(() => {
        fetch(`/api/blog/view/${slug}`, { method: 'PUT' })
          .then(() => {
            sessionStorage.setItem(viewKey, 'true');
          })
          .catch((err) => console.error('Failed to increment view:', err));
      }, 500); // delay added to prevent race condition

      return () => clearTimeout(timer);
    }
  }, [blog?._id]);

  if (loading) return <p className="text-center mt-10 text-sm">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10 text-sm">Blog not found.</p>;

  const showImage =
    blog?.img?.startsWith('/') ||
    blog?.img?.startsWith('http') ||
    blog?.img?.startsWith('data:image');

  return (
    <div className="md:px-20 px-6 pt-28 sm:pt-32 bg-white">
      {/* Blog and Sidebar Layout for md+ */}
      <div className="hidden md:flex gap-8">
        {/* Main Blog Content */}
        <div className="w-[75%]">
          <span className="relative z-10 rounded-md inline-block px-3 py-1 mb-3 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-base sm:text-lg md:text-[17px]">
            <h2 className="skew-x-[10deg] tracking-wide capitalize">{blog.category}</h2>
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-black leading-snug">
            {blog.title}
          </h1>

          <p className="text-indigo-600 text-xs sm:text-sm font-medium mb-4 flex items-center gap-2">
            {formattedDate} •
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {blog.views} views
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
        </div>

        {/* Sidebar (Latest Blog) */}
        <div className="w-[25%]">
          <LatestBlog variant="overlay" />
        </div>
      </div>

      {/* Layout for sm screens */}
      <div className="md:hidden">
        {/* Blog First */}
        <div>
          <span className="relative z-10 rounded-md inline-block px-3 py-1 mb-3 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-base">
            <h2 className="skew-x-[10deg] tracking-wide capitalize">{blog.category}</h2>
          </span>

          <h1 className="text-2xl font-bold mb-3 text-black leading-snug">{blog.title}</h1>

          <p className="text-indigo-600 text-xs font-medium mb-4 flex items-center gap-2">
            {formattedDate} •
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {blog.views} views
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
        </div>

        {/* Related Blogs Second */}
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-4 text-black">
            Related {blog.category} Blogs
          </h2>
          <BlogGridSection blogs={relatedBlogs} />
        </div>

        {/* Latest Blogs Third */}
        <div className="md:mt-10">
          <LatestBlog variant="overlay" />
        </div>
      </div>

      {/* Related Blogs for md+ (bottom row) */}
      <div className="hidden md:block md:mt-10 mt-20">
        <h2 className="text-xl font-bold mb-4 text-black">
          Related {blog.category} Blogs
        </h2>
        <BlogGridSection blogs={relatedBlogs} />
      </div>
    </div>
  );
}
