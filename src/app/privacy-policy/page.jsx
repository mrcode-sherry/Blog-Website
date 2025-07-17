'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import LatestBlog from '@/components/LatestBlog';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-white text-gray-800">
      {/* Breadcrumb */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="bg-gray-100 py-10 px-4 rounded-md shadow-sm mb-16 mt-16"
      >
        <div className="max-w-7xl mx-auto text-center items-center">
          <nav className="text-sm text-gray-600 text-[20px] space-x-1">
            <Link href="/" className="text-indigo-600 hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-800 font-semibold capitalize">Privacy Policy</span>
          </nav>
        </div>
      </motion.section>

      {/* Content Grid */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side (75%) */}
        <section className="w-full lg:w-[75%] space-y-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300"
          >
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-[22px] sm:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">Privacy Policy</h2>
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-base text-gray-700 leading-relaxed"
          >
            Welcome to our blog platform where we share cutting-edge articles on web development,
            performance optimization, frameworks like Next.js and React, and digital trends shaping
            the future. Our goal is to provide developers, tech enthusiasts, and professionals with
            insightful and actionable content that inspires and educates.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-base text-gray-700 leading-relaxed"
          >
            Whether you're a beginner or a seasoned developer, our platform curates content that
            helps you stay ahead in the evolving tech world. From tutorials to industry analysis,
            we’re here to grow with you.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="flex flex-wrap items-center gap-6 mt-6"
          >
            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Linkedin size={24} />
            </Link>
          </motion.div>
        </section>

        {/* Right Side (25%) */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="w-full lg:w-[25%]"
        >
          <LatestBlog variant="overlay" />
        </motion.aside>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
