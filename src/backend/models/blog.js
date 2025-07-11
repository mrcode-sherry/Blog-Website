import mongoose from "mongoose";
import { slugify } from "@/utils/slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    metitle: {
      type: String,
      trim: true,
      default: function () {
        return this.title;
      },
    },
    desc: {
      type: String,
      required: [true, "Blog description is required"],
    },
    metadesc: {
      type: String,
      trim: true,
      default: function () {
        return this.desc?.substring(0, 160);
      },
    },
    img: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Blog category is required"],
      lowercase: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
