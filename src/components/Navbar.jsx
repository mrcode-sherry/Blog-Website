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


  return (
    <>
      <nav className={`fixed top-0 w-full z-50 px-4 md:px-20 py-5 flex justify-between items-center transition-all duration-300 
        ${scrolled || menuOpen ? 'bg-gray-800/70 backdrop-blur-md shadow-sm text-white' : 'bg-white text-black'}`}>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/shine.png" alt="MyBlog Logo" width={40} height={40} priority />
          <span className="text-xl font-bold">MyBlog</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium text-[16px] items-center">
          <li>
            <Link href="/" className="hover:text-indigo-500 transition">Home</Link>
          </li>

          {categories.map((cat) => (
            <li key={cat}>
              <Link href={`/blogs/${cat.toLowerCase()}`} className="hover:text-indigo-500 transition">
                {cat}
              </Link>
            </li>
          ))}

          {/* Contact with Dropdown */}
          <li className="group relative">
            <div className="flex items-center hover:text-indigo-500 transition focus:outline-none cursor-pointer">
              <Link href="/contact" className="flex items-center">
                Contact <ChevronDown size={18} className="ml-1" />
              </Link>
            </div>
            <div className="absolute hidden group-hover:block bg-white text-black shadow-2xl rounded-lg py-2 w-40 z-50">
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 hover:text-indigo-500 transition">About</Link>
              <Link href="/privacy-policy" className="block px-4 py-2 hover:bg-gray-100 hover:text-indigo-500 transition">Privacy Policy</Link>
            </div>
          </li>


          {/* Dashboard (only if logged in) */}
          {isAuthenticated && (
            <li>
              <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Search Button */}
        <button
          onClick={() => setShowSearch(true)}
          className={`hidden md:block transition cursor-pointer ${scrolled ? 'text-white' : 'text-black'}`}
        >
          <Search size={20} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden transition ${scrolled ? 'text-white' : 'text-black'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
            {/* Close Button */}
            <button onClick={() => setShowSearch(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 cursor-pointer">
              <X size={20} />
            </button>

            {/* Search Field */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-3/4 h-screen bg-black/60 text-white z-50 p-5 shadow-lg flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">MyBlog</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
              <X size={24} />
            </button>
          </div>

          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/blogs/${cat.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {cat}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/privacy-policy" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>

          {isAuthenticated && (
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 text-center">
              Dashboard
            </Link>
          )}
        </div>
      )}
    </>
  );
}
