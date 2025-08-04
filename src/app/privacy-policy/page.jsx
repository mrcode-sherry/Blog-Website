// src/app/privacy-policy/page.jsx

import PrivacyPolicyClient from '@/components/PrivacyPolicyClient';

export const generateMetadata = () => ({
  title: 'Kintechy | Understand Your Data Privacy Rights Clearly',
  description: 'Find out how Kintechy keeps your information safe, uses cookies, and follows the rules set by GDPR, CCPA, and other privacy laws.',
  alternates: {
    canonical: "https://www.kintechy.com/privacy-policy",
  },
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
