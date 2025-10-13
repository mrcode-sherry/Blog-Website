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

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.25} className="text-base text-gray-700 leading-relaxed">
            Hi from <strong>Kintechy</strong>. We consider it our duty to protect the personal information you share with us as we appreciate your privacy. Here, we outline your rights in visiting kintechy.com ("Site") and what information we collect and how we use it. By using the Site, you acknowledge the privacy practices in this policy.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-lg font-semibold text-indigo-600 mt-6">
            Data We Collect
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.35} className="text-base text-gray-700 leading-relaxed">
            Personal data refers to information such as your name, email address, and any additional information provided via contact forms and in newsletters.
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="text-base text-gray-700 leading-relaxed">
            Usage Information includes data like the device and browser used, the IP address, the time spent on our website, the pages visited, and the referrer site that directed you to our website.
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.45} className="text-base text-gray-700 leading-relaxed">
            Analytics and comprehension of user preferences, as well as user tracking, is done using cookies and similar technologies.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="text-lg font-semibold text-indigo-600 mt-6">
            How We Use Your Information
          </motion.h3>
          <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.55} className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>To provide the operation, maintenance and upgrading of the Site and functions.</li>
            <li>To contact you (sending newsletters or updates, in case you subscribed).</li>
            <li>To examine the usage of the sites and enhance the user experience.</li>
            <li>To prevent fraud and guarantee security.</li>
            <li>To customize content to your interests.</li>
          </motion.ul>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.6} className="text-lg font-semibold text-indigo-600 mt-6">
            Data Sharing and Disclosure
          </motion.h3>
          <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.65} className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>We do not sell your personal data.</li>
            <li>We can distribute information to service providers (hosting, analytics, email delivery) on a stringent privacy agreement.</li>
            <li>We can provide aggregated or de-identified data to be used in analytics and research.</li>
          </motion.ul>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.7} className="text-lg font-semibold text-indigo-600 mt-6">
            Data Retention and Security
          </motion.h3>
          <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.75} className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>We retain personal data only as long as needed to fulfill the purposes described and to comply with legal obligations.</li>
            <li>We implement reasonable security measures to protect data. No method of transmission over the internet is 100% secure.</li>
          </motion.ul>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.8} className="text-lg font-semibold text-indigo-600 mt-6">
            Your Rights
          </motion.h3>
          <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.85} className="list-disc pl-6 text-gray-700 text-base space-y-1">
            <li>Access, correct, delete, or export your data.</li>
            <li>Withdraw consent where applicable.</li>
            <li>Opt out of marketing communications.</li>
            <li>Do Not Sell My Personal Data rights where applicable.</li>
          </motion.ul>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={0.9} className="text-lg font-semibold text-indigo-600 mt-6">
            Cookies Policy
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.95} className="text-base text-gray-700 leading-relaxed">
            <strong>Uses of cookies:</strong> Core cookies: The cookies are required to make the site functional, and keep it secure; Analytics cookies: The cookies are required to know how you use the site, and we need your permission to do so.
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.0} className="text-base text-gray-700 leading-relaxed">
            <strong>Your cookie preferences:</strong> Manage your interests and preferences; Recommend other content and performance to you (where allowed, with your consent).
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.05} className="text-base text-gray-700 leading-relaxed">
            <strong>Cookie management:</strong> The user can manage cookies or withdraw cookies as needed through their browser settings or cookie banner on our site; You can manage cookies or withdraw cookies at any time where necessary.
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.1} className="text-base text-gray-700 leading-relaxed">
            <strong>Third-party cookies and advertisers:</strong> There are those cookies which are introduced by third parties (e.g., Google Analytics, Google Ads). They have their privacy policies and can control their preferences in those providers.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.15} className="text-lg font-semibold text-indigo-600 mt-6">
            Third-Party Links and Services
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.2} className="text-base text-gray-700 leading-relaxed">
            Our site may link to third-party sites with their own privacy practices. We're not responsible for those policies.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.35} className="text-lg font-semibold text-indigo-600 mt-6">
            Children's Privacy
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.4} className="text-base text-gray-700 leading-relaxed">
            <strong>Kintechy</strong> does not target children below the age of 13. Our data collection on children is not conscious.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.45} className="text-lg font-semibold text-indigo-600 mt-6">
            Policy Updates
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.5} className="text-base text-gray-700 leading-relaxed">
            We may update this policy. The "Last updated" date will change accordingly. We'll notify you of material changes as required by law.
          </motion.p>

          <motion.h3 variants={fadeUp} initial="hidden" animate="visible" custom={1.55} className="text-lg font-semibold text-indigo-600 mt-6">
            How to Contact Us
          </motion.h3>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1.6} className="text-base text-gray-700 leading-relaxed">
            <strong>Kintechy</strong> Media Ltd.
            <br />
            Email: <a href="mailto:kintechyinfo@gmail.com" className="text-indigo-600 underline">kintechyinfo@gmail.com</a>
            <br />
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