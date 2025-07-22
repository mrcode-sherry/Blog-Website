import { NextResponse } from "next/server";
import dbConnect from "@/backend/db"; // ✅ Your DB connection file
import Blog from "@/backend/models/blog"; // ✅ Your Blog mongoose model

export async function GET(req, context) {
  const { category } = context.params;

  if (!category) {
    return NextResponse.json({ success: false, error: "Category not provided" }, { status: 400 });
  }

  try {
    await dbConnect(); // Connect to DB

    const blogs = await Blog.find({ category }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
