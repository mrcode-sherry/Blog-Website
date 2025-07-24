// src/app/privacy-policy/page.jsx

import PrivacyPolicyClient from '@/components/PrivacyPolicyClient';

export const generateMetadata = () => ({
  title: 'Kintechy | Privacy Policy',
  description: 'Learn how we protect your data in our Privacy Policy, use cookies to ensure you get the best experience at Kintechy, and remember your consent while staying complaint with GDPR, CCPA and more.',
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
