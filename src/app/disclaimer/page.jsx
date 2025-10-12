import DisclaimerClient from "@/components/DisclaimerClient";

export const generateMetadata = () => {
  return {
    title: 'Kintechy | Disclaimer - Important Information and Notices',
    description:
      "Read Kintechy's Disclaimer to understand important information about our blog content and services.",
    robots: 'index, follow',
    alternates: {
      canonical: 'https://www.kintechy.com/disclaimer',
    },
  };
};

export default function DisclaimerPage() {
  return <DisclaimerClient />;
}
