// src/app/privacy-policy/page.jsx

import PrivacyPolicyClient from '@/components/PrivacyPolicyClient';

export const generateMetadata = () => ({
  title: 'Kintechy | Understand Your Data Privacy Rights Clearly',
  description: 'Learn how Kintechy protects your data, uses cookies, and complies with GDPR, CCPA, and other privacy standards.',
  alternates: {
    canonical: "https://kintechy.com/privacy-policy",
  },
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
