'use client';

import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import LatestBlog from "@/components/LatestBlog";
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false); // added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Your message has been sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
      } else {
        alert("❌ Failed to send message: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("❌ An error occurred while sending the message.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-white text-gray-800">
      {/* Hero Section */}
      <motion.section
        variants={fadeInUp}
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
            <span className="text-gray-800 font-semibold capitalize">Contact</span>
          </nav>
        </div>
      </motion.section>

      <section className="flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <motion.article
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-[75%] space-y-6"
        >
          <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">Contact Us</h2>
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl space-y-5"
            aria-label="Contact Form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                Subject<span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                required
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone (optional)
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto cursor-pointer duration-300 px-6 py-3 rounded-md transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Message'}
            </button>
          </form>

          {/* Socials and Contact Info */}
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Get in Touch</h2>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/kintechy_media2025"
                target="_blank"
                aria-label="Instagram"
                className="p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
              >
                <Instagram size={20} />
              </Link>
            </div>

            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="text-indigo-600" size={20} />
                <Link
                  href="kintechyinfo@gmail.com"
                  className="hover:underline text-[16px] hover:text-indigo-700 transition"
                >
                  kintechyinfo@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Latest Blogs Section */}
        <motion.aside
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-[25%]"
        >
          <LatestBlog variant="overlay" />
        </motion.aside>
      </section>
    </main>
  );
};

export default ContactForm;
