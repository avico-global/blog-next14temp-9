import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Menu, Search, X, ChevronDown } from "lucide-react";

export default function Navbar({ logo, categories, imagePath, blog_list }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef(null);
  const searchRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = blog_list.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Categories",
      href: "#",
      dropdown: true,
      items: categories,
    },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 text-white">
            <Logo logo={logo} imagePath={imagePath} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <button
                    className="flex items-center space-x-1 text-white hover:text-secondary transition-colors"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === link.name ? null : link.name
                      )
                    }
                    title={link.name}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-white hover:text-secondary transition-colors relative group"
                    title={link.name}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div
                    className="absolute top-full right-0 mt-2 w-[400px] backdrop-blur-sm rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="grid gap-2 p-4 bg-black/70 backdrop-blur-md">
                      {link.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/${sanitizeUrl(item.title)}`}
                          className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title={item.title}
                        >
                          <Image
                            src={`${imagePath}/${item.image}`}
                            title={item.title}
                            alt={item.title}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <span className="text-white font-medium">
                            {item.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Search Bar */}
            <div ref={searchRef} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
                className="bg-white/10 text-white placeholder-white/60 rounded-full px-4 py-2 w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              {searchResults.length > 0 && searchQuery && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl">
                  <div className="py-2">
                    {searchResults.map((result, idx) => (
                      <Link
                        key={idx}
                        href={`/${sanitizeUrl(
                          result.article_category
                        )}/${sanitizeUrl(result.title)}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                        title={result.title}
                      >
                        {result.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-full p-2 hover:bg-white/10 transition-colors"
            title="Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.name ? null : link.name
                        )
                      }
                      className="flex items-center justify-between w-full py-2 text-white"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="mt-2 space-y-2 pl-4">
                        {link.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/${sanitizeUrl(item.title)}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
                            title={item.title}
                          >
                            <Image
                              src={`${imagePath}/${item.image}`}
                              title={item.title}
                              alt={item.title}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                            />
                            <span className="text-white">{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-2 text-white hover:text-secondary transition-colors"
                    title={link.title}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Search */}
            <div className="pt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full bg-white/10 text-white placeholder-white/60 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
