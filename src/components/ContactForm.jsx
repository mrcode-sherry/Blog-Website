'use client';
import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import LatestBlog from "@/components/LatestBlog";
import Link from 'next/link';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-100 py-8 sm:py-10 px-4 rounded-md shadow-sm mb-12 sm:mb-16 mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <nav className="text-sm text-gray-600 sm:text-[20px] space-x-1">
            <Link href="/" className="text-indigo-600 hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-800 font-semibold capitalize">Contact</span>
          </nav>
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <article className="w-full md:w-[75%] space-y-6">
          <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
           <div className="flex items-center w-full before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <span className="relative z-10 rounded-md inline-block px-4 py-2 mb-5 bg-indigo-600 text-white font-bold italic skew-x-[-10deg] text-center text-lg sm:text-xl md:text-[25px]">
              <h2 className="skew-x-[10deg] tracking-wide capitalize">Contact Us</h2>
            </span>
          </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-5"
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
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Submit Message
            </button>
          </form>

          {/* Socials and Contact Info */}
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Get in Touch</h2>

            {/* Social Icons */}
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
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="p-3 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
              >
                <Linkedin size={20} />
              </Link>
            </div>

            {/* Email and Phone */}
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="text-indigo-600" size={20} />
                <Link href="mailto:info@example.com" className="hover:underline text-[16px] hover:text-indigo-700 transition">
                  info@example.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-indigo-600" size={20} />
                <Link href="tel:+1234567890" className="hover:underline text-[16px] hover:text-indigo-700 transition">
                  +1 (234) 567-890
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Latest Blogs Section */}
        <aside className="w-full md:w-[25%]">
          <LatestBlog variant="overlay" />
        </aside>
      </section>
    </main>
  );
};

export default ContactForm;
