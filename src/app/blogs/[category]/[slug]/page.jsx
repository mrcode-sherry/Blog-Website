import BlogDetailsPage from "@/components/BlogDetailsPage";
import { notFound } from "next/navigation";

// 📌 Generate metadata for SEO and Open Graph
export async function generateMetadata(props) {
  const slug = props.params.slug;
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

  return {
    title: blog.metitle || blog.title,
    description: blog.metadesc || blog.desc?.slice(0, 160),
    openGraph: {
      title: blog.metitle || blog.title,
      description: blog.metadesc || blog.desc?.slice(0, 160),
      images: blog.img ? [blog.img] : [],
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
