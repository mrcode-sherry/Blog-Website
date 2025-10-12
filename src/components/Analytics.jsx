'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function Analytics() {
  const { isAnalyticsAllowed, consentStatus } = useCookieConsent();
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  useEffect(() => {
    // Only load analytics if user has consented
    if (consentStatus && isAnalyticsAllowed()) {
      setShouldLoadAnalytics(true);
    } else if (consentStatus && !isAnalyticsAllowed()) {
      setShouldLoadAnalytics(false);
      // Disable analytics if previously enabled
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }
  }, [consentStatus, isAnalyticsAllowed]);

  // Don't render analytics scripts if not consented
  if (!shouldLoadAnalytics) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-12RS8FW7XE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Initialize with denied consent by default
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied'
          });

          gtag('config', 'G-12RS8FW7XE', {
            anonymize_ip: true,
            cookie_flags: 'secure;samesite=strict'
          });
        `}
      </Script>
    </>
  );
}
