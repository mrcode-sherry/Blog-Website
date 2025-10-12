// Cookie management utilities for GDPR compliance

/**
 * Cookie categories for granular consent
 */
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing'
};

/**
 * Set a cookie with expiration
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiration
 */
export const setCookie = (name, value, days = 30) => {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
export const getCookie = (name) => {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Get consent status from localStorage
 * @returns {Object|null} Consent object or null
 */
export const getConsentStatus = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const consent = localStorage.getItem('cookieConsent');
    return consent ? JSON.parse(consent) : null;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
};

/**
 * Save consent status to localStorage
 * @param {boolean} accepted - Whether cookies were accepted
 * @param {Object} categories - Cookie categories consent
 */
export const saveConsentStatus = (accepted, categories = null) => {
  if (typeof window === 'undefined') return;
  
  const consent = {
    accepted,
    timestamp: new Date().toISOString(),
    version: '1.0',
    categories: categories || {
      [COOKIE_CATEGORIES.NECESSARY]: true,
      [COOKIE_CATEGORIES.ANALYTICS]: accepted,
      [COOKIE_CATEGORIES.MARKETING]: false
    }
  };
  
  try {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
};

/**
 * Clear all consent data
 */
export const clearConsentStatus = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cookieConsent');
  // Clear analytics cookies if declined
  deleteCookie('_ga');
  deleteCookie('_ga_*');
  deleteCookie('_gid');
  deleteCookie('_gat');
};

/**
 * Check if a specific cookie category is consented
 * @param {string} category - Cookie category
 * @returns {boolean} Whether category is consented
 */
export const isCategoryConsented = (category) => {
  const consent = getConsentStatus();
  if (!consent) return false;
  
  return consent.categories[category] === true;
};

/**
 * Check if consent has expired (30 days)
 * @returns {boolean} Whether consent has expired
 */
export const isConsentExpired = () => {
  const consent = getConsentStatus();
  if (!consent) return true;
  
  const consentDate = new Date(consent.timestamp);
  const now = new Date();
  const daysDiff = (now - consentDate) / (1000 * 60 * 60 * 24);
  
  return daysDiff > 30;
};

/**
 * Check if user needs to see cookie consent
 * @returns {boolean} Whether to show consent modal
 */
export const shouldShowConsent = () => {
  const consent = getConsentStatus();
  return !consent || isConsentExpired();
};