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

const TermsOfServiceClient = () => {
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
            <span className="text-gray-800 font-semibold capitalize">Terms of Service</span>
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
              <h2 className="skew-x-[10deg] tracking-wide capitalize">Terms of Service</h2>
            </span>
          </motion.div>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-lg font-semibold text-indigo-600 mt-6">
            Acceptance of Terms
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.25} className="text-base text-gray-700 leading-relaxed">
            By using <strong>Kintechy</strong> (the Site), you agree to these Terms of Service and our Privacy Policy. If you disagree, please do not use the Site.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-lg font-semibold text-indigo-600 mt-6">
            About Kintechy
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-base text-gray-700 leading-relaxed">
            <strong>Kintechy</strong> is a contemporary blog that deals with Technology, Finance, Business and Health. We are interested in offering simple and helpful information to the readers.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-lg font-semibold text-indigo-600 mt-6">
            Intellectual Property
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.45} className="text-base text-gray-700 leading-relaxed">
            All site content is owned by <strong>Kintechy</strong> or licensed to us. You may view for personal use; reproduce or redistribute content only with written permission.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="text-lg font-semibold text-indigo-600 mt-6">
            User Content
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="text-base text-gray-700 leading-relaxed">
            By making such comments or other content, you are giving a global, non-exclusive license to <strong>Kintechy</strong> to showcase and use it. You have ownership of your posts; we have the authority to take down the content that does not conform to policies.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.6} className="text-lg font-semibold text-indigo-600 mt-6">
            Advertising & Affiliate Disclosures
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.65} className="text-base text-gray-700 leading-relaxed">
            There can be affiliate links or sponsored content on some of the posts. We are reporting these relationships, and we can also make a commission where it is permitted. This does not influence the price at which you pay.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.7} className="text-lg font-semibold text-indigo-600 mt-6">
            Privacy
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.75} className="text-base text-gray-700 leading-relaxed">
            Please read our Privacy Policy to learn how we collect and use your data and how it protects your privacy.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.8} className="text-lg font-semibold text-indigo-600 mt-6">
            Disclaimers and Limitation of Liability
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.85} className="text-base text-gray-700 leading-relaxed">
            The Site is provided "as is" and "as available." We do not guarantee accuracy or uninterrupted access. <strong>Kintechy</strong> and its affiliates are not liable for damages arising from use of the Site.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.9} className="text-lg font-semibold text-indigo-600 mt-6">
            Indemnification
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.95} className="text-base text-gray-700 leading-relaxed">
            You agree to defend and indemnify <strong>Kintechy</strong> from claims arising from your use of the Site or breach of these Terms.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.0} className="text-lg font-semibold text-indigo-600 mt-6">
            Governing Law and Disputes
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.05} className="text-base text-gray-700 leading-relaxed">
            These Terms are governed by the laws of the jurisdiction where <strong>Kintechy</strong> is incorporated. Any disputes will be resolved in the appropriate courts or through arbitration as permitted by law.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.1} className="text-lg font-semibold text-indigo-600 mt-6">
            Changes and Termination
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.15} className="text-base text-gray-700 leading-relaxed">
            We may update these Terms at any time. Changes take effect on posting. We may suspend or terminate access for violations or for any reason.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.2} className="text-lg font-semibold text-indigo-600 mt-6">
            Contact
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.25} className="text-base text-gray-700 leading-relaxed">
            If you have questions about these Terms, contact <a href="mailto:kintechyinfo@gmail.com" className="text-indigo-600 underline">kintechyinfo@gmail.com</a>.
            <br /><br />
            <span className='text-indigo-600 text-[18px] font-semibold'>Last Updated:</span> October 12, 2025
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

export default TermsOfServiceClient;
