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

const AboutClient = () => {
  return (
    <main className="min-h-screen bg-white px-6 md:px-20 py-10 text-gray-800">
      {/* Breadcrumb */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-gray-100 py-8 sm:py-10 px-4 rounded-md shadow-sm mb-12 sm:mb-16 mt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <nav className="text-sm text-gray-600 sm:text-[20px] space-x-1">
            <Link href="/" className="text-indigo-600 hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-800 font-semibold capitalize">About</span>
          </nav>
        </div>
      </motion.section>

      {/* Content Grid */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Side */}
        <section className="w-full lg:w-[75%] space-y-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300"
          >
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">About Us</h2>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-sm sm:text-base text-gray-700 leading-relaxed">
            <strong>KINTECHY</strong> is a complete contemporary blogging platform for today's fast-moving digital world. We write about tech, health, finance and business… just tryin' to show life in cool and fresh way to our readers.
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.25} className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We know it’s hard to follow tech, money stuff or lifestyle things every time. That’s why we try make simple content — helpful, true and useful for you and your business to grow.
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Our team make hard topics easy to understand. If you want to know about new gadgets, smart tech, or you have small business with cool ideas — we here for you, to help you go ahead in life.
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-sm sm:text-base text-gray-700 leading-relaxed">
            From Technology guides for beginners to updates on the evolving workplace and digital tools, we curate content designed to inform and inspire those interested in well-being and productivity.
            </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-sm sm:text-base text-gray-700 leading-relaxed">
            But we are more than just a website. <strong>KINTECHY</strong> is a community of people eager to learn and help others grow. If you come for business tips, lifestyle stuff, or just want to read something nice — we happy you’re here with us.
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.45} className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Let’s grow, learn, and become inspired together — one blog at a time.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex items-center gap-6 mt-4 sm:mt-6"
          >
            <Link href="https://www.facebook.com/people/Kintechy-Media/61579023332486/" target="_blank" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <Facebook size={24} />
            </Link>
            <Link href="https://www.instagram.com/kintechy_media2025" target="_blank" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <Instagram size={24} />
            </Link>
          </motion.div>
        </section>

        {/* Right Side */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="w-full lg:w-[25%]"
        >
          <LatestBlog variant="overlay" />
        </motion.aside>
      </div>
    </main>
  );
};

export default AboutClient;
