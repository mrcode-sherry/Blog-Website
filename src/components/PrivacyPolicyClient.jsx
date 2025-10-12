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

const PrivacyPolicyClient = () => {
  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-white text-gray-800">
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-gray-100 py-8 sm:py-10 px-4 rounded-md shadow-sm mb-12 sm:mb-16 mt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <nav className="text-sm text-gray-600 sm:text-[20px] space-x-1">
            <Link href="/" className="text-indigo-600 hover:underline font-medium">Home</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-800 font-semibold capitalize">Privacy Policy</span>
          </nav>
        </div>
      </motion.section>

      <div className="flex flex-col lg:flex-row gap-10">
        <section className="w-full lg:w-[75%] space-y-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300"
          >
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">Privacy Policy</h2>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-base text-gray-700 leading-relaxed">
            At <strong>KINTECHY</strong>, your privacy matter big time. We care for your data, your safety, and you full right to control what info you give. This page tell simple – what we take, how we use it, and how we try keep it safe.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-lg font-semibold text-indigo-600 mt-6">
            What Personal Data We Collect
          </motion.h3>
          <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>Email addresses for newsletters and updates.</li>
            <li>Basic contact info submitted via contact forms.</li>
            <li>Anonymous analytics like IP, device type, browser, and page time.</li>
            <li>Cookies to save preferences and improve performance.</li>
          </motion.ul>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-lg font-semibold text-indigo-600 mt-6">
            Why We Use Your Information
          </motion.h3>
          <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.45} className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>We write helpful blogs about business, health, and tech stuff – trying our best to keep it useful and simple for you.</li>
            <li>If you say yes, we send emails and little updates to your inbox – but only when you want. No forcing, no spamming.</li>
            <li>We check how people use our website with tools like Google Analytics – just to make things better for all visitors.</li>
            <li>We don’t like bad stuff – so we block spam, stop fake users, and protect our site from anything fishy or harmful.</li>
            <li>When we see what users do, we get smart ideas to build better features. Your activity helps us grow.</li>
            <li><strong>One more thing – we never ever sell or rent your info. Not to anyone. Not even by mistake.</strong></li>
          </motion.ul>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="text-lg font-semibold text-indigo-600 mt-6">
            Cookie & Tracking Policy
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="text-base text-gray-700 leading-relaxed">
            We use cookies and Google tools (like Analytics) just to see how people use our website. These little cookies help the site load faster and remember what you like — so next time, things feel smooth and easy for you. You can stop or delete cookies anytime from your browser settings — easy peasy.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.56} className="bg-gray-50 rounded-lg p-4 mt-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Types of Cookies We Use:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for basic site functionality and security. These cannot be disabled.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google Analytics). You can opt-out of these.</li>
              <li><strong>Performance Cookies:</strong> Used to improve site speed and user experience.</li>
            </ul>
            <div className="mt-4 p-3 bg-indigo-50 rounded border-l-4 border-indigo-600">
              <p className="text-sm text-indigo-800">
                <strong>Your Choice:</strong> When you first visit our site, you'll see a cookie consent banner. You can choose to accept or decline non-essential cookies. Your choice is remembered for 30 days.
              </p>
            </div>
          </motion.div>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.6} className="text-lg font-semibold text-indigo-600 mt-6">
            Third-Party Services & Affiliate Links
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.65} className="text-base text-gray-700 leading-relaxed">
            Some blog posts got affiliate links or ads from other people. If you click or buy through them, we maybe get small help — but no extra cost for you. These services may place cookies on your device. <strong> KINTECHY </strong> does not control third-party domains. Please refer to their privacy policies.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.7} className="text-lg font-semibold text-indigo-600 mt-6">
            Your Privacy Rights (GDPR & CCPA)
          </motion.h3>
          <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.75} className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>You can see, change, or even remove your personal info anytime — no problem.</li>
            <li>Opt out of any marketing emails at any time.</li>
            <li>If you live in California, you can request “Do Not Sell My Personal Info.”</li>
            <li>If you’re in the EU, request a portable copy of your data.</li>
          </motion.ul>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.8} className="text-base text-gray-700 leading-relaxed mt-2">
            To exercise your rights, email us at <a href="mailto:kintechyinfo@gmail.com" className="text-indigo-600 underline">kintechyinfo@gmail.com</a>. We respond within 7 days.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.85} className="text-lg font-semibold text-indigo-600 mt-6">
            Children’s Privacy
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.9} className="text-base text-gray-700 leading-relaxed">
            We do not knowingly collect data from children. If you're a parent and believe your child has shared personal info, contact us immediately at <a href="mailto:kintechyinfo@gmail.com" className="text-indigo-600 underline">kintechyinfo@gmail.com</a>.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.95} className="text-lg font-semibold text-indigo-600 mt-6">
            Policy Updates
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.0} className="text-base text-gray-700 leading-relaxed">
            We update this Privacy Policy periodically to reflect new site features and legal changes. Check the “Last updated” date at the bottom of this page for the latest version.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.05} className="text-lg font-semibold text-indigo-600 mt-6">
            Contact KINTECHY
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.1} className="text-base text-gray-700 leading-relaxed">
            For any questions regarding this Privacy Policy, cookies, or data usage, contact us at <a href="mailto:kintechyinfo@gmail.com" className="text-indigo-600 underline">kintechyinfo@gmail.com</a> or write to:
            <br />
            <span className="block mt-2 font-medium">
              KINTECHY Media Ltd.  
            </span>
            <span className='mt-3'>
              <span className='text-indigo-600 text-[18px] font-semibold'>Last updated:</span> October 1, 2025
            </span>
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.2} className="flex flex-wrap items-center gap-6 mt-6">
            <Link href="https://www.facebook.com/people/Kintechy-Media/61579023332486/" target="_blank" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <Facebook size={24} />
            </Link>
            <Link href="https://www.instagram.com/kintechy_media2025" target="_blank" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <Instagram size={24} />
            </Link>
          </motion.div>
        </section>

        <motion.aside variants={fadeUp} initial="hidden" animate="visible" custom={1.25} className="w-full lg:w-[25%]">
          <LatestBlog variant="overlay" />
        </motion.aside>
      </div>
    </main>
  );
};

export default PrivacyPolicyClient;
