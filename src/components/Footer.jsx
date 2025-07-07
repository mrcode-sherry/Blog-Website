import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 1. Logo & Contact Info */}
        <div className="md:w-56">
          <h2 className="text-xl font-bold text-white mb-4">YourLogo</h2>
          <p className="text-sm leading-relaxed mb-5">
            Empowering you with blogs across tech, design, business, and more.
          </p>
          <div className="flex gap-3 mb-4">
            <Link href="https://facebook.com" target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition">
              <Facebook size={18} className="text-white" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition">
              <Instagram size={18} className="text-white" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition">
              <Linkedin size={18} className="text-white" />
            </Link>
          </div>
          <p className="text-sm mt-2">
            📧{" "}
            <Link href="mailto:info@example.com" className="text-indigo-400 hover:underline">
              info@example.com
            </Link>
          </p>
          <p className="text-sm">
            📞{" "}
            <Link href="tel:+1234567890" className="text-indigo-400 hover:underline">
              +1 (234) 567-890
            </Link>
          </p>
        </div>

        {/* 2. Blog Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Blog Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/category/react" className="hover:text-indigo-400">React</Link></li>
            <li><Link href="/category/javascript" className="hover:text-indigo-400">JavaScript</Link></li>
            <li><Link href="/category/nextjs" className="hover:text-indigo-400">Next.js</Link></li>
            <li><Link href="/category/ui-ux" className="hover:text-indigo-400">UI/UX</Link></li>
            <li><Link href="/category/css" className="hover:text-indigo-400">CSS</Link></li>
            <li><Link href="/category/deployment" className="hover:text-indigo-400">Deployment</Link></li>
          </ul>
        </div>

        {/* 3. Pages */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-indigo-400">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-indigo-400">Privacy Policy</Link></li>
            <li><Link href="/about" className="hover:text-indigo-400">About</Link></li>
          </ul>
        </div>

        {/* 4. Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-4 leading-relaxed">
            Subscribe to get the latest blog updates directly to your inbox.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
