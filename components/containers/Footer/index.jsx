import React from "react";
import FullContainer from "../../common/FullContainer";
import Container from "../../common/Container";
import PopularPosts from "../PopularPosts";
import LatestPosts from "../LatestPosts";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/myFun";
import Logo from "@/components/containers/Navbar/Logo";

export default function Footer({
  logo,
  categories,
  blog_list,
  imagePath,
  category,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/sitemap.xml";
  };

  return (
    <div className="bg-primary">
      <div className="text-white py-20">
        <div className="flex flex-col items-center mb-16">
          <div className="mb-10">
            <Logo logo={logo} imagePath={imagePath} className="mx-auto w-48" />
          </div>
          <h3 className="text-xl font-medium text-secondary mb-3">Stay in Loop</h3>
          <p className="text-4xl md:text-5xl font-bold text-white mb-8 text-center max-w-2xl">
            Subscribe to our weekly update
          </p>
          <div className="w-full max-w-xl px-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 font-medium text-lg px-8 py-4 bg-white/5 border rounded-full border-gray-600 text-white placeholder:text-gray-400 focus:border-secondary transition-colors"
              />
              <button className="px-8 py-4 rounded-full border-2 border-secondary font-semibold text-lg text-secondary hover:bg-secondary hover:text-white transition-all duration-300">
                Subscribe
              </button>
            </div>
            <div className="flex items-center gap-3 justify-center ">
              <input
                type="checkbox"
                id="privacy-policy"
                className="w-6 bg-transparent h-6 accent-secondary translate-y-[1px]"
              />
              <label htmlFor="privacy-policy" className="text-normal text-white flex items-center">
                I have read and agree to the{" "}
                <Link 
                title="Privacy Policy"
                href="/privacy-policy" className="text-secondary hover:text-secondary/80 hover:underline transition-colors ml-1">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col  justify-center gap-16  mb-16">
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg mb-6 text-secondary">Categories</p>
            <div className="flex flex-wrap gap-4 justify-center max-w-xl">
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  title={item?.title || category || "Article Link"}
                  href={`/${sanitizeUrl(item.title)}`}
                  className={cn(
                    "text-sm px-4 py-2 rounded-full border border-gray-600 hover:border-secondary hover:text-secondary transition-all duration-300",
                    category === item.title && "text-secondary border-secondary"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-bold text-lg mb-6 text-secondary">Quick Links</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
              title="Home"
              href="/" className="text-sm px-4 py-2 rounded-full border border-gray-600 hover:border-secondary hover:text-secondary transition-all duration-300">
                Home
              </Link>
              <Link
              title="About"
              href="/about" className="text-sm px-4 py-2 rounded-full border border-gray-600 hover:border-secondary hover:text-secondary transition-all duration-300">
                About
              </Link>
              <Link
              title=" Contact"
              href="/contact" className="text-sm px-4 py-2 rounded-full border border-gray-600 hover:border-secondary hover:text-secondary transition-all duration-300">
                Contact
              </Link>
              <Link
              title="Terms & Conditions"
              href="/terms-and-conditions" className="text-sm px-4 py-2 rounded-full border border-gray-600 hover:border-secondary hover:text-secondary transition-all duration-300">
                Terms & Conditions
              </Link>
              <Link 
              title="Privacy Policy"
              href="/privacy-policy" className="text-sm px-4 py-2 rounded-full border border-gray-600 hover:border-secondary hover:text-secondary transition-all duration-300">
                Privacy Policy
              </Link>
              <Link
               title="Sitemap"
               href="/sitemap.xml" legacyBehavior>
                <a title="Sitemap" onClick={handleClick} className="text-sm px-4 py-2 rounded-full border border-gray-600 hover:border-secondary hover:text-secondary transition-all duration-300">
                  Sitemap
                </a>
              </Link>
            </div>
          </div>
        </div>

        <p className="pt-8 mt-8 border-t border-gray-600/50 text-white/70 font-medium text-center text-sm">
          © Lynx — {new Date().getFullYear()}. All rights reserved. Powered by BuzzBlog.
        </p>
      </div>
    </div>
  );
}
