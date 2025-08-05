import AboutClient from "@/components/AboutClient";

export const generateMetadata = () => {
  return {
    title: 'Kintechy | Discover Our Mission and Blog Purpose',
    description:
      'Get to know Kintechy – an innovative blog platform featuring technology, business, Health, Sports and finance content.',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://www.kintechy.com/about',
    },
  };
};

export default function AboutPage() {
  return <AboutClient />;
}
