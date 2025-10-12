import { useState, useEffect } from 'react';
import {
  getConsentStatus,
  saveConsentStatus,
  clearConsentStatus,
  shouldShowConsent,
  COOKIE_CATEGORIES
} from '@/utils/cookieUtils';

/**
 * Custom hook for managing cookie consent state
 * @returns {Object} Cookie consent state and actions
 */
export const useCookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [consentStatus, setConsentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize consent status on mount
  useEffect(() => {
    const initializeConsent = () => {
      const consent = getConsentStatus();
      setConsentStatus(consent);
      setShowConsent(shouldShowConsent());
      setLoading(false);
    };

    // Delay initialization to ensure client-side rendering
    if (typeof window !== 'undefined') {
      setTimeout(initializeConsent, 100);
    }
  }, []);

  /**
   * Accept all cookies
   */
  const acceptCookies = () => {
    const categories = {
      [COOKIE_CATEGORIES.NECESSARY]: true,
      [COOKIE_CATEGORIES.ANALYTICS]: true,
      [COOKIE_CATEGORIES.MARKETING]: false
    };
    
    saveConsentStatus(true, categories);
    const newConsent = getConsentStatus();
    setConsentStatus(newConsent);
    setShowConsent(false);
    
    // Trigger analytics initialization if needed
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  /**
   * Decline all non-essential cookies
   */
  const declineCookies = () => {
    const categories = {
      [COOKIE_CATEGORIES.NECESSARY]: true,
      [COOKIE_CATEGORIES.ANALYTICS]: false,
      [COOKIE_CATEGORIES.MARKETING]: false
    };
    
    saveConsentStatus(false, categories);
    const newConsent = getConsentStatus();
    setConsentStatus(newConsent);
    setShowConsent(false);
    
    // Clear analytics cookies
    clearConsentStatus();
    
    // Update analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  /**
   * Update specific category consent
   * @param {string} category - Cookie category
   * @param {boolean} accepted - Whether category is accepted
   */
  const updateCategoryConsent = (category, accepted) => {
    const currentConsent = getConsentStatus();
    if (!currentConsent) return;
    
    const newCategories = {
      ...currentConsent.categories,
      [category]: accepted
    };
    
    const overallAccepted = newCategories[COOKIE_CATEGORIES.ANALYTICS] || 
                           newCategories[COOKIE_CATEGORIES.MARKETING];
    
    saveConsentStatus(overallAccepted, newCategories);
    setConsentStatus(getConsentStatus());
  };

  /**
   * Reset all consent (for settings page)
   */
  const resetConsent = () => {
    clearConsentStatus();
    setConsentStatus(null);
    setShowConsent(true);
  };

  /**
   * Check if analytics is allowed
   * @returns {boolean} Whether analytics is consented
   */
  const isAnalyticsAllowed = () => {
    if (!consentStatus) return false;
    return consentStatus.categories[COOKIE_CATEGORIES.ANALYTICS] === true;
  };

  /**
   * Check if marketing cookies are allowed
   * @returns {boolean} Whether marketing is consented
   */
  const isMarketingAllowed = () => {
    if (!consentStatus) return false;
    return consentStatus.categories[COOKIE_CATEGORIES.MARKETING] === true;
  };

  /**
   * Get consent timestamp
   * @returns {string|null} Consent timestamp
   */
  const getConsentTimestamp = () => {
    return consentStatus?.timestamp || null;
  };

  return {
    // State
    showConsent,
    consentStatus,
    loading,
    
    // Actions
    acceptCookies,
    declineCookies,
    updateCategoryConsent,
    resetConsent,
    
    // Helpers
    isAnalyticsAllowed,
    isMarketingAllowed,
    getConsentTimestamp,
    
    // Manual control
    setShowConsent
  };
};

export default useCookieConsent;