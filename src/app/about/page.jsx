import AboutClient from "@/components/AboutClient";

export const generateMetadata = () => {
  return {
    title: 'Kintechy | About',
    description:
      'Learn more about Kintechy – a forward-thinking blog platform covering technology, business, crypto, and lifestyle content.',
    robots: 'index, follow',
  };
};

export default function AboutPage() {
  return <AboutClient />;
}
