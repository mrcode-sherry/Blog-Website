import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import Blog from "@/backend/models/blog";

export async function GET(req, context) {
  const { category } = context.params;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 9;
  const skip = (page - 1) * limit;

  if (!category) {
    return NextResponse.json({ success: false, error: "Category not provided" }, { status: 400 });
  }

  try {
    await dbConnect();

    const totalCount = await Blog.countDocuments({ category });
    const blogs = await Blog.find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      blogs,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
