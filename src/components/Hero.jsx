"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-20 transition-all overflow-hidden">
      <div className="mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-4">

        {/* Right: Hero Image with Text Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full md:w-[35%] max-w-sm h-80 sm:h-96 rounded-md overflow-hidden shadow-md group order-2 md:order-none"
        >
          <Image
            src="/Hero/blog-hero.jpg"
            alt="Blogging Website Hero Image"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/90 to-transparent" />

          {/* Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute md:top-33 top-20 z-20 text-white px-5 w-full space-y-2"
          >
            <span className="z-10 rounded-md inline-block px-2 py-1 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-[13px] md:text-[15px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">
                Daily Trending Blogs
              </h2>
            </span>
            <h3 className="md:text-[26px] text-xl font-semibold leading-snug">
              Discover the Future of Tech, AI & Digital Life
            </h3>
            <p className="md:text-[16px] text-sm opacity-90 leading-relaxed">
              Explore trending stories in AI, Web Development, SEO, Business, Law, Fashion & Health.  
              Stay updated — stay inspired.
            </p>
          </motion.div>
        </motion.div>

        {/* Left: Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-[60%] text-center md:text-left space-y-4 sm:space-y-6 order-1 md:order-none"
        >
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight leading-snug sm:leading-tight"
          >
            Read the Latest Blogs on Tech, Business, Health & More
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0"
          >
            Stay informed with expert-written articles across technology, fashion, business, entertainment, law, and health.
            We deliver real stories, tutorials, and opinions — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md shadow-md transition duration-200 cursor-pointer">
                Publish Your Blog
              </button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm max-w-xl leading-relaxed pt-3 sm:pt-4 mx-auto md:mx-0"
          >
            Our blogging platform publishes daily updates in multiple categories so readers can explore tech innovations, fashion trends, legal updates, business strategies, healthcare advice, and entertainment highlights.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
