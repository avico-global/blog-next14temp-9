import React from "react";
import Link from "next/link";
import Logo from "../Navbar/Logo";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer({ logo, imagePath, categories }) {
  const currentYear = new Date().getFullYear();

 

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact-us" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "contact@example.com",
      href: "mailto:contact@example.com",
    },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "123 Street Name, City, Country", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black to-black/95 pt-20 pb-10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6 text-white flex flex-col items-start">
            <Logo logo={logo} imagePath={imagePath} />
            <p className="text-white/60 text-sm leading-relaxed">
              Discover the latest insights, tutorials, and trends in the world
              of technology and development.
            </p>
          
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-secondary flex items-center gap-2 
                             transition-colors duration-300 group"
                    title={link.name}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 
                                         group-hover:opacity-100 group-hover:translate-y-0 
                                         group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Categories  
            </h3>
            <ul className="space-y-4">
              {categories?.slice(0, 6).map((category, index) => ( 
                <li key={index}>
                  <Link
                    href={`/${category.title.toLowerCase()}`}
                    className="text-white/60 hover:text-secondary flex items-center gap-2 
                             transition-colors duration-300 group"
                    title={category.title}
                  >
                    <span>{category.title}</span>
                    <ArrowUpRight
                      className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 
                                         group-hover:opacity-100 group-hover:translate-y-0 
                                         group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-semibold text-lg mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Stay updated with our latest articles and tech news.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2
                         text-white placeholder-white/40 focus:outline-none focus:border-secondary
                         transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/80 text-white px-6 py-2 rounded-lg
                         transition-colors duration-300 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {currentYear} Your Blog Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
