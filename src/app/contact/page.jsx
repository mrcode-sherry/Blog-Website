// src/app/contact/page.jsx
import React from 'react';
import ContactForm from '../../components/ContactForm';

// ✅ SEO Metadata
export const generateMetadata = () => {
  return {
    title: "Kintechy | Contact",
    description: "Get in touch with kintechy. We would love to hear from you. Send your message question or feedback today!",
    robots: "index, follow",
  };
};

const ContactPage = () => {
  return (
    <section className="bg-white">
      <ContactForm />
    </section>
  );
};

export default ContactPage;
