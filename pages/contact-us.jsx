import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Map from "@/components/containers/Map";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Font
import { Raleway } from "next/font/google";
import GoogleTagManager from "@/lib/GoogleTagManager";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JsonLd from "@/components/json/JsonLd";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Contact({
  logo,
  imagePath,
  blog_list,
  categories,
  contact_details,
  meta,
  domain,
  layout,
  favicon,
  nav_type,
  footer_type,
}) {
  const page = layout?.find((item) => item.page === "contact");
  const breadcrumbs = useBreadcrumbs();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@example.com",
      description: "We'll respond within 24 hours",
      link: "mailto:contact@example.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Business Street",
      description: "New York, NY 10001",
      link: "#",
    },
  ];

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/contact-us`} />
        {/* <meta name="robots" content="noindex" /> */}
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar
        logo={logo}
        nav_type={nav_type}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        contact_details={contact_details}
      />

      <div className="min-h-[50vh] py-20 pt-32 bg-black flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-white text-4xl font-bold mb-10">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-white/80 mb-2 text-sm"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                                           text-white placeholder-white/40 focus:outline-none focus:border-secondary
                                           transition-colors duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-white/80 mb-2 text-sm"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                                           text-white placeholder-white/40 focus:outline-none focus:border-secondary
                                           transition-colors duration-300"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                className="block text-white/80 mb-2 text-sm"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                                         text-white placeholder-white/40 focus:outline-none focus:border-secondary
                                         transition-colors duration-300"
                placeholder="How can we help?"
                required
              />
            </div>

            <div>
              <label
                className="block text-white/80 mb-2 text-sm"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                                         text-white placeholder-white/40 focus:outline-none focus:border-secondary
                                         transition-colors duration-300"
                placeholder="Your message..."
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-medium
                                       py-4 rounded-lg transition-colors duration-300 flex items-center 
                                       justify-center gap-2"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <Footer
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        footer_type={footer_type}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/#website`,
              url: `http://${domain}/`,
              name: domain,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `http://${domain}`,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_contact" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0],
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      contact_details: contact_details.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}
