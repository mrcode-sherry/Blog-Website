import AboutClient from "@/components/AboutClient";

export const generateMetadata = () => {
  return {
    title: 'Kintechy | Discover Our Mission and Blog Purpose',
    description:
      'Get to know Kintechy – an innovative blog platform featuring technology, business, health and finance content blogs.',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://www.kintechy.com/about',
    },
  };
};

export default function AboutPage() {
  return <AboutClient />;
}
