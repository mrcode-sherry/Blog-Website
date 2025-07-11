"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-4">
        
        {/* Right: Hero Image with SEO Content */}
        <div className="relative w-full md:w-[35%] max-w-sm h-80 sm:h-96 rounded-md overflow-hidden shadow-md group order-2 md:order-none">
          <Image
            src="/Hero/blog-hero.jpg"
            alt="Blogging Website Hero Image"
            fill
            className="object-cover"
            priority
          />

          {/* Bottom Blurred Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-28 sm:h-36 overflow-hidden">
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
            <h3 className="text-[14px] font-semibold leading-tight sm:text-base">
              Explore Daily Tech News, AI Trends, Web Dev Tips & More
            </h3>
            <p className="text-xs sm:text-sm opacity-90 mt-1">
              Discover trending blogs in React, JavaScript, SEO, Business, and Health — updated regularly.
            </p>
          </div>
        </div>

        {/* Left: Hero Text */}
        <div className="w-full md:w-[60%] text-center md:text-left space-y-4 sm:space-y-6 order-1 md:order-none">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight leading-snug sm:leading-tight">
            Read the Latest Blogs on Tech, Business, Health & More
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0">
            Stay informed with expert-written articles across technology, fashion, business, entertainment, law, and health.
            We deliver real stories, tutorials, and opinions — all in one place.
          </p>

          <Link href="/blogs">
            <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md shadow-md transition duration-200 cursor-pointer">
              Browse All Blogs
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
