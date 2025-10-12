import TermsOfServiceClient from "@/components/TermsOfServiceClient";

export const generateMetadata = () => {
  return {
    title: 'Kintechy | Terms of Service - Read Our Terms and Conditions',
    description:
      "Read Kintechy's Terms of Service to understand your rights and responsibilities when using our blog platform.",
    robots: 'index, follow',
    alternates: {
      canonical: 'https://www.kintechy.com/terms-of-service',
    },
  };
};

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
