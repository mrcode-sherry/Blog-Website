// src/app/contact/page.jsx
import React from 'react';
import ContactForm from '../../components/ContactForm';

// ✅ SEO Metadata
export const generateMetadata = () => {
  return {
    title: "Kintechy | Contact",
    description: "Get in touch with Kintechy. We'd love to hear from you. Send your message, inquiry, or feedback today.",
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
