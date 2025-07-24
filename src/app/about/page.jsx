import AboutClient from "@/components/AboutClient";

export const generateMetadata = () => {
  return {
    title: 'Kintechy | About',
    description:
      'Get to know Kintechy – An innovative blog platform featuring technology, businesses, cryptocurrency and lifestyle contents.',
    robots: 'index, follow',
  };
};

export default function AboutPage() {
  return <AboutClient />;
}
