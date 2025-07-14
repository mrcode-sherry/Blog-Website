"use client";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-4">
        
        {/* Right: Hero Image with Text Overlay */}
        <div className="relative w-full md:w-[35%] max-w-sm h-80 sm:h-96 rounded-md overflow-hidden shadow-md group order-2 md:order-none">
          <Image
            src="/Hero/blog-hero.jpg"
            alt="Blogging Website Hero Image"
            fill
            className="object-cover"
            priority
          />

          {/* Enhanced Dark Overlay Covering More Than Half */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/90 to-transparent" />

          {/* Center-Bottom Text */}
          <div className="absolute md:top-33 top-20 z-20 text-white px-5 w-full space-y-2">
            <span className="z-10 rounded-md inline-block px-2 py-1 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-[13px] md:text-[15px]">
            <h2 className="skew-x-[10deg] tracking-wide capitalize">Daily Trending Blogs</h2>
          </span>
            <h3 className="md:text-[26px] text-xl font-semibold leading-snug">
              Discover the Future of Tech, AI & Digital Life
            </h3>
            <p className="md:text-[16px] text-sm opacity-90 leading-relaxed">
              Explore trending stories in AI, Web Development, SEO, Business, Law, Fashion & Health.  
      Stay updated — stay inspired.
            </p>
          </div>
        </div>

        {/* Left: Hero Text - Unchanged */}
        <div className="w-full md:w-[60%] text-center md:text-left space-y-4 sm:space-y-6 order-1 md:order-none">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight leading-snug sm:leading-tight">
            Read the Latest Blogs on Tech, Business, Health & More
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0">
            Stay informed with expert-written articles across technology, fashion, business, entertainment, law, and health.
            We deliver real stories, tutorials, and opinions — all in one place.
          </p>

          <Link href="/contact">
            <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md shadow-md transition duration-200 cursor-pointer">
              Publish Your Blog
            </button>
          </Link>

          <p className="text-gray-500 text-sm max-w-xl leading-relaxed pt-3 sm:pt-4 mx-auto md:mx-0">
            Our blogging platform publishes daily updates in multiple categories so readers can explore tech innovations, fashion trends, legal updates, business strategies, healthcare advice, and entertainment highlights.
          </p>
        </div>
      </div>
    </section>
  );
}
