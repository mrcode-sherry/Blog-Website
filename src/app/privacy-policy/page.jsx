// src/app/privacy-policy/page.jsx

import PrivacyPolicyClient from '@/components/PrivacyPolicyClient';

export const generateMetadata = () => ({
  title: 'Kintechy | Privacy Policy',
  description: 'Read Kintechy’s Privacy Policy to understand how we protect your personal information, use cookies, and stay compliant with GDPR & CCPA.',
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
