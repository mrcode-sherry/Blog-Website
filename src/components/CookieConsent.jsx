'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ExternalLink } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const CookieConsent = () => {
  const {
    showConsent,
    loading,
    acceptCookies,
    declineCookies,
    setShowConsent
  } = useCookieConsent();

  // Don't render during loading or if consent not needed
  if (loading || !showConsent) return null;

  const handleAccept = () => {
    acceptCookies();
  };

  const handleDecline = () => {
    declineCookies();
  };

  const handleClose = () => {
    setShowConsent(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {showConsent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Cookie Consent Modal */}
      <AnimatePresence>
        {showConsent && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 100 
            }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 z-[10000] md:max-w-md"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 text-white relative">
                <div className="flex items-center gap-3">
                  <Cookie size={24} className="text-indigo-100" />
                  <h3 className="text-lg font-semibold">Cookie Consent</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-indigo-100 hover:text-white transition-colors p-1 rounded-full hover:bg-indigo-500/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>

                {/* Cookie Categories Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">What we use cookies for:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <span className="font-medium">Essential:</span> Site functionality and security</li>
                    <li>• <span className="font-medium">Analytics:</span> Understanding how you use our site</li>
                    <li>• <span className="font-medium">Performance:</span> Improving site speed and experience</li>
                  </ul>
                </div>

                {/* Privacy Policy Link */}
                <div className="mb-6">
                  <Link 
                    href="/privacy-policy" 
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
                  >
                    Learn more in our Privacy Policy
                    <ExternalLink size={14} />
                  </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
                  >
                    Decline
                  </button>
                </div>

                {/* Essential Cookies Notice */}
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Essential cookies will always be used to ensure the site works properly.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;