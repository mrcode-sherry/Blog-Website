import BlogDetailsPage from "@/components/BlogDetailsPage";
import { notFound } from "next/navigation";

// 📌 Helper to remove HTML tags
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}

// 📌 Generate metadata for SEO and Open Graph
export async function generateMetadata(props) {
  const slug = props.params.slug;
  const category = props.params.category;
  if (!slug) return { title: "Blog Not Found" };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  const data = await res.json();
  const blog = data?.blog;

  if (!data.success || !blog) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  // Strip HTML from blog.desc and limit to 120 characters
  const cleanDesc = stripHtml(blog.metadesc || blog.desc || "").slice(0, 130);

  return {
    title: blog.metitle || blog.title,
    description: cleanDesc,
    openGraph: {
      title: blog.metitle || blog.title,
      description: cleanDesc,
      images: blog.img ? [blog.img] : [],
    },
    alternates: {
      canonical: `https://www.kintechy.com/blogs/${category}/${slug}`,
    },
  };
}

// 📌 Blog Page Component
export default async function BlogPage(props) {
  const slug = props.params.slug;

  // Fetch current blog
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  if (!data.success || !data.blog) return notFound();

  const blog = data.blog;

  // Fetch all blogs to get related ones
  const allRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: "no-store",
  });

  const allData = await allRes.json();

  const relatedBlogs = allData.success
    ? allData.blogs.filter((b) => b.category === blog.category && b._id !== blog._id)
    : [];

  return <BlogDetailsPage blog={blog} relatedBlogs={relatedBlogs} />;
}
