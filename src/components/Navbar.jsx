'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const modalRef = useRef(null);
  const menuRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const categories = [
    'Technology',
    'Finance',
    'Business',
    'Health',
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleMenuClose();
      }
      if (showSearch && modalRef.current && !modalRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, showSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleMenuClose = () => {
    setAnimateClose(true);
    setTimeout(() => {
      setMenuOpen(false);
      setAnimateClose(false);
    }, 200);
  };

  return (
    <>
      {/* Top Navbar with animation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 px-6 overflow-hidden md:overflow-visible md:px-20 py-5 flex justify-between items-center transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-gray-800/70 backdrop-blur-md shadow-sm text-white'
            : 'bg-white text-black'
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image src="/WebsiteLogo/kintechy-logo.png" alt="MyBlog Logo" className="-ml-3" width={50} height={50} priority />
          <span className="text-xl font-bold pt-1">KINTECHY</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium text-[16px] items-center">
          <li>
            <Link href="/" className="hover:text-indigo-500 transition">
              Home
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/blogs/${cat.toLowerCase()}`}
                className="hover:text-indigo-500 transition"
              >
                {cat}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="hover:text-indigo-500 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-indigo-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy" className="hover:text-indigo-500 transition">
              Privacy Policy
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex space-x-3 items-center">
          <button
            onClick={() => setShowSearch(true)}
            className={`transition cursor-pointer ${scrolled ? 'text-white' : 'text-black'}`}
          >
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-4 z-[999]">
          <button
            onClick={() => setShowSearch(true)}
            className={`transition cursor-pointer ${scrolled ? 'text-white' : 'text-black'}`}
          >
            <Search size={22} />
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className={`transition ${scrolled ? 'text-white' : 'text-black'}`}
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              ref={menuRef}
              className="bg-black/90 w-[80%] h-screen py-6 px-6 overflow-y-auto relative"
            >
              <div className="flex items-center justify-between mb-9">
                <div className="flex items-center space-x-2">
                  <Image src="/WebsiteLogo/kintechy-logo.png" alt="Logo" width={45} height={45} />
                  <span className="text-white text-xl font-bold">KINTECHY</span>
                </div>
                <button
                  onClick={handleMenuClose}
                  className="text-white hover:bg-white/20 rounded-full p-1 transition"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-6 text-white px-2">
                <Link href="/" onClick={handleMenuClose} className="hover:text-indigo-400">
                  Home
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/blogs/${cat.toLowerCase()}`}
                    onClick={handleMenuClose}
                    className="hover:text-indigo-400"
                  >
                    {cat}
                  </Link>
                ))}
                <Link href="/contact" onClick={handleMenuClose} className="hover:text-indigo-400">
                  Contact
                </Link>
                <Link href="/about" onClick={handleMenuClose} className="hover:text-indigo-400">
                  About
                </Link>
                <Link
                  href="/privacy-policy"
                  onClick={handleMenuClose}
                  className="hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  onClick={handleMenuClose}
                  className="hover:text-indigo-400"
                >
                  Terms of Service
                </Link>
                 <Link
                  href="/disclaimer"
                  onClick={handleMenuClose}
                  className="hover:text-indigo-400"
                >
                  Disclaimer
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/dashboard"
                    onClick={handleMenuClose}
                    className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 mt-2"
                  >
                    Dashboard
                  </Link>
                )}
              </nav>
            </motion.div>
            <div className="w-[20%] h-screen" onClick={handleMenuClose}></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-center">
          <form
            onSubmit={handleSearch}
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative h-28 md:mt-40 mt-24"
          >
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="absolute top-1 right-2 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full p-1 transition"
            >
              <X size={20} />
            </button>
            <div className="relative mt-4">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 text-gray-800"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-indigo-500 hover:text-indigo-700"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
