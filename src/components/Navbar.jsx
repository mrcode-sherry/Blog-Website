'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const categories = [
    'Technology',
    'Finance',
    'Business',
    'Crypto',
    'Sports',
    'Lifestyle',
    'Health',
    'Fashion'
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
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 px-6 md:px-20 py-5 flex justify-between items-center transition-all duration-300 
        ${scrolled || menuOpen ? 'bg-gray-800/70 backdrop-blur-md shadow-sm text-white' : 'bg-white text-black'}`}>

        {/* Hide logo when menuOpen is true */}
        {!menuOpen && (
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/shine.png" alt="MyBlog Logo" width={40} height={40} priority />
            <span className="text-xl font-bold">MyBlog</span>
          </Link>
        )}

        {/* Desktop Navigation */}
        {!menuOpen && (
          <ul className="hidden md:flex space-x-6 font-medium text-[16px] items-center">
            <li><Link href="/" className="hover:text-indigo-500 transition">Home</Link></li>
            {categories.map((cat) => (
              <li key={cat}>
                <Link href={`/blogs/${cat.toLowerCase()}`} className="hover:text-indigo-500 transition">
                  {cat}
                </Link>
              </li>
            ))}
            <li className="group relative">
              <div className="flex items-center hover:text-indigo-500 transition cursor-pointer">
                <Link href="/contact" className="flex items-center">
                  Contact <ChevronDown size={18} className="ml-1" />
                </Link>
              </div>
              <div className="absolute hidden group-hover:block bg-white text-black shadow-2xl rounded-lg py-2 w-40 z-50">
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 hover:text-indigo-500 transition">About</Link>
                <Link href="/privacy-policy" className="block px-4 py-2 hover:bg-gray-100 hover:text-indigo-500 transition">Privacy Policy</Link>
              </div>
            </li>
            {isAuthenticated && (
              <li>
                <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        )}

        {/* Search Button (Desktop Only) */}
        {!menuOpen && (
          <button
            onClick={() => setShowSearch(true)}
            className={`hidden md:block transition cursor-pointer ${scrolled ? 'text-white' : 'text-black'}`}
          >
            <Search size={20} />
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden z-[999] transition ${scrolled || menuOpen ? 'text-white' : 'text-black'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
            <button onClick={() => setShowSearch(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-600">
              <X size={20} />
            </button>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-[9px] text-indigo-500 w-5" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search blogs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[80] bg-black/90 flex">
          <div ref={menuRef} className="w-[75%] max-w-sm h-screen bg-gray-900 text-white p-6 flex flex-col gap-4">
            {/* Logo & Close */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Image src="/shine.png" alt="Logo" width={34} height={34} />
                <span className="text-lg font-semibold">MyBlog</span>
              </div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
                <X size={24} />
              </button>
            </div>

            <Link href="/" onClick={() => setMenuOpen(false)} className="py-1">Home</Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/blogs/${cat.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="py-1">
                {cat}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="py-1">Contact</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="py-1">About</Link>
            <Link href="/privacy-policy" onClick={() => setMenuOpen(false)} className="py-1">Privacy Policy</Link>
            {isAuthenticated && (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="bg-blue-600 py-1 text-center rounded hover:bg-blue-700">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
