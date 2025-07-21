"use client";
import { useEffect } from "react";

export default function ViewCounter({ slug }) {
  useEffect(() => {
    const viewKey = `viewed-${slug}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(viewKey)) return;

    const timer = setTimeout(() => {
      fetch(`/api/blog/view/${slug}`, { method: "PUT" })
        .then(() => sessionStorage.setItem(viewKey, "true"))
        .catch((err) => console.error("Failed to increment view:", err));
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  return null;
}