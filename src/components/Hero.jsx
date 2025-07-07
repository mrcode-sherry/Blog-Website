"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-4">

        {/* Left: Hero Text */}
        <div className="w-full md:w-[60%] text-center md:text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight leading-tight">
            Read the Latest Blogs on Tech, Business, Health & More
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-3xl leading-relaxed mx-auto md:mx-0">
            Stay informed with expert-written articles across technology, fashion, business, entertainment, law, and health.
            We deliver real stories, tutorials, and opinions — all in one place.
          </p>

          <Link href="/blogs">
            <button className="mt-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-md shadow-md transition duration-200 cursor-pointer">
              Browse All Blogs
            </button>
          </Link>

          <p className="text-gray-500 text-sm max-w-3xl leading-relaxed pt-4 mx-auto md:mx-0">
            Our blogging platform publishes daily updates in multiple categories so readers can explore tech innovations, fashion trends, legal updates, business strategies, healthcare advice, and entertainment highlights.
          </p>
        </div>

        {/* Right: Hero Image with SEO Content */}
        <div className="relative w-full md:w-[35%] max-w-sm h-96 rounded-md overflow-hidden shadow-md group">

          {/* Background Image */}
          <Image
            src="/Hero/blog-hero.jpg" // Replace with your image
            alt="Blogging Website Hero Image"
            fill
            className="object-cover"
            priority
          />

          {/* Bottom Blurred Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-36 overflow-hidden">
            <Image
              src="/featured-blog.jpg"
              alt="Blurred Bottom"
              fill
              className="object-cover blur-md scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/10" />
          </div>

          {/* Text Overlay on Image */}
          <div className="absolute bottom-0 z-20 text-white px-4 py-3">
            <h3 className="text-base font-semibold leading-tight">
              Explore Daily Tech News, AI Trends, Web Dev Tips & More
            </h3>
            <p className="text-sm opacity-90 mt-1">
              Discover trending blogs in React, JavaScript, SEO, Business, and Health — updated regularly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
