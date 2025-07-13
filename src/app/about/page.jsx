'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import LatestBlog from '@/components/LatestBlog'; // Ensure path is correct

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white px-6 md:px-20 py-10 text-gray-800">
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-8 sm:py-10 px-4 rounded-md shadow-sm mb-12 sm:mb-16 mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <nav className="text-sm text-gray-600 sm:text-[20px] space-x-1">
            <Link href="/" className="text-indigo-600 hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-800 font-semibold capitalize">About</span>
          </nav>
        </div>
      </section>

      {/* Content Grid */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Side */}
        <section className="w-full lg:w-[75%] space-y-6">
          {/* Title */}
          <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">About Us</h2>
            </span>
          </div>

          {/* Paragraphs */}
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Welcome to our blog platform where we share cutting-edge articles on web development,
            performance optimization, frameworks like Next.js and React, and digital trends shaping
            the future. Our goal is to provide developers, tech enthusiasts, and professionals with
            insightful and actionable content that inspires and educates.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Whether you're a beginner or a seasoned developer, our platform curates content that
            helps you stay ahead in the evolving tech world. From tutorials to industry analysis,
            we’re here to grow with you.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-4 sm:mt-6">
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
          </div>
        </section>

        {/* Right Side */}
        <aside className="w-full lg:w-[25%]">
          <LatestBlog variant="overlay" />
        </aside>
      </div>
    </main>
  );
};

export default AboutPage;
