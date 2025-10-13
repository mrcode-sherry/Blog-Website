'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
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

const DisclaimerClient = () => {
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
            <span className="text-gray-800 font-semibold capitalize">Disclaimer</span>
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
              <h2 className="skew-x-[10deg] tracking-wide capitalize">Disclaimer</h2>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.25} className="text-base text-gray-700 leading-relaxed">
            <strong>Kintechy</strong> provides information for general educational purposes only. The content found in this site is not professional advice (legal, medical, financial, or otherwise) and can not be relied upon. Inasmuch as we make our best efforts to be correct, the information may be incomplete and outdated and you should consider any facts that are crucial and verify them with primary sources or people that are knowledgeable before you act on them. Your use of <strong>Kintechy</strong> is at your own risk.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-lg font-semibold text-indigo-600 mt-6">
            Affiliates and external links
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-base text-gray-700 leading-relaxed">
            Affiliated links or sponsored articles might be used in some of the articles. We share these relationships where possible and we also receive a commission in case of purchase or any other desired action through such links. <strong>Kintechy</strong> has no control or supervision over the content or practices of other sites that are linked to this site.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-lg font-semibold text-indigo-600 mt-6">
            Content and accuracy
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.45} className="text-base text-gray-700 leading-relaxed">
            We make the best we can to give the truth, but the knowledge in technology, finance, business and health can change rapidly. We do not even promise that the content is always up-to-date and free of a mistake. The readers have been encouraged to exercise their discretion and refer to a professional where need be.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="text-lg font-semibold text-indigo-600 mt-6">
            User-generated content
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="text-base text-gray-700 leading-relaxed">
            All user posted comments or any other content are personal views of their authors and have nothing to do with what <strong>Kintechy</strong> thinks. We have the right to censor or delete user generated content that contravenes our policies.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.6} className="text-lg font-semibold text-indigo-600 mt-6">
            Intellectual property
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.65} className="text-base text-gray-700 leading-relaxed">
            <strong>Kintechy</strong> is a firm that protects its contents by copyright. It is also possible to refer or quote small sections, but it is not allowed to reproduce large sections without permission.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.7} className="text-lg font-semibold text-indigo-600 mt-6">
            Limitation of liability
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.75} className="text-base text-gray-700 leading-relaxed">
            To the best of the law, <strong>Kintechy</strong> and its owners shall not have any liabilities to pay damages and losses caused by the use of this site and its contents including indirect and consequential damages.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.8} className="text-lg font-semibold text-indigo-600 mt-6">
            Governing law
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.85} className="text-base text-gray-700 leading-relaxed">
            This disclaimer is governed by the laws of the jurisdiction where <strong>Kintechy</strong> operates. Changes to this disclaimer will be posted on the site.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.9} className="text-lg font-semibold text-indigo-600 mt-6">
            Updates
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.95} className="text-base text-gray-700 leading-relaxed">
            We may update this disclaimer from time to time. The "Last updated" date will change accordingly. Please review it periodically.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.0} className="text-lg font-semibold text-indigo-600 mt-6">
            Contact
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.05} className="text-base text-gray-700 leading-relaxed">
            If you have questions about this disclaimer, please contact <a href="mailto:kintechyinfo@gmail.com" className="text-indigo-600 underline">kintechyinfo@gmail.com</a>.
            <br /><br />
            <span className='text-indigo-600 text-[18px] font-semibold'>Last updated:</span> October 12, 2025
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

export default DisclaimerClient;
