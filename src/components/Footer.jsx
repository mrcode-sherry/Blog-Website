"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) return setError("Email is required.");
    if (!validateEmail(email))
      return setError("Please enter a valid email address.");

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("✅ Thanks for subscribing!");
        setEmail("");
      } else setError(data.message || "❌ Subscription failed.");
    } catch {
      setError("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 1. Logo & Contact Info */}
        <div className="md:w-56">
          <Link href="/" className="flex items-center mb-4">
            <Image
              src="/WebsiteLogo/kintechy-logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="-ml-3"
            />
            <h2 className="text-xl font-bold text-white ">KINTECHY</h2>
          </Link>
          <p className="text-sm leading-relaxed mb-5">
            Your daily dose of tech, health, business and more in one place.
          </p>
          <div className="flex gap-3 mb-4">
            <Link
              href="https://www.facebook.com/people/Kintechy-Media/61579023332486/"
              target="_blank"
              className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition"
            >
              <Facebook size={18} className="text-white" />
            </Link>
            <Link
              href="https://www.instagram.com/kintechy_media2025"
              target="_blank"
              className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition"
            >
              <Instagram size={18} className="text-white" />
            </Link>
          </div>
          <p className="text-[16px] mt-2">
            📧{" "}
            <a
              href="mailto:kintechyinfo@gmail.com"
              className="text-indigo-400 hover:underline"
            >
              kintechyinfo@gmail.com
            </a>

          </p>
        </div>

        {/* 2. Blog Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Blog Categories
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Technology",
              "Finance",
              "Business",
              "Health",
            ].map((cat) => (
              <li key={cat}>
                <Link
                  href={`/blogs/${cat.toLowerCase()}`}
                  className="hover:text-indigo-400 capitalize"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Pages */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-indigo-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-indigo-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-400">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-4 leading-relaxed">
            Never miss a post — get the latest blogs delivered straight to your
            inbox.
          </p>
          <form className="space-y-3" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 cursor-pointer duration-200 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
