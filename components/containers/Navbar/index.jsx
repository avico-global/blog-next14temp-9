import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Menu, Search, X } from "lucide-react";


export default function Navbar({
  logo,
  categories,
  imagePath,
  handleSearchToggle,
  handleSearchChange,
  filteredBlogs,
  searchQuery,
  openSearch,
  blog_list,
  searchContainerRef,
}) {
  const [sidebar, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Add this useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Close sidebar on any resize to prevent unwanted behavior
      setSidebar(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const lastThreeBlogs = blog_list.slice(-3);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false); // Close sidebar if clicked outside
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  return (
    <>
      <div className="w-full absolute top-0 left-0 z-50 text-white shadow-sm my-4">
        <div className="flex items-center justify-between gap-3 mx-auto pt-6 pb-6 px-20 max-w-full">
          <div className="">
            <Logo logo={logo} imagePath={imagePath}  />
          </div>

          {/* Main Nav Links */}
          <div className="hidden lg:flex text-white font-bold space-x-4 lg:space-x-9">
            <Link
              title="Home"
              href="/"
              className="hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Home
            </Link>
            <Link
              title="Blog"
              href="/blog"
              className="hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Blog
            </Link>

            {/* Categories Link */}
            <div
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button title="Categories" className="hover:text-secondary">
                Categories
              </button>

              {/* Categories Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full bg-black shadow-xl rounded-md z-50 p-4 w-[500px] grid  gap-4">
                  {categories.map((category, index) => (
                    <Link
                    title={category.title || "ARticle Category"}
                      key={index}
                      href={`/${encodeURI(sanitizeUrl(category.title))}`}
                      className="hover:bg-secondary rounded-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 p-2">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
                          title={category.title}
                          width={60}
                          height={100}
                          className="rounded-md h-14 object-cover"
                        />
                        <span className="font-medium text-white capitalize">
                          {category.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              title="Contact"
              href="/contact"
              className="hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-secondary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Contacts
            </Link>
          </div>

          <div className=" flex ">
            {/* Search Section */}
            <div
              className="flex items-center justify-end gap-3 text-gray-500 relative"
              ref={searchContainerRef}
            >
              <div className="flex items-center justify-end gap-2">
                <Search
                  className="w-5 md:w-4 text-white font-bold cursor-pointer"
                  onClick={handleSearchToggle}
                />
              </div>
              {openSearch && (
                <div className="absolute top-full right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full border border-gray-300 rounded-t-md p-3 focus:outline-none"
                    placeholder="Search..."
                  />
                  {searchQuery && (
                    <div className="max-h-[400px] overflow-y-auto">
                      {filteredBlogs?.map((item, index) => (
                        <Link
                          title={item.title}
                          key={index}
                          href={`/${item.article_category.name}/${item.key}`}
                        >
                          <div className="p-3 hover:bg-gray-100 border-b text-gray-600">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <Menu
              onClick={() => setSidebar(true)}
              className="cursor-pointer w-8 ml-4"
            />
          </div>
        </div>
      </div>

      {/* Updated Sidebar - modify the className */}
      <div
        className={`fixed top-0 ${
          sidebar ? "right-0" : "-right-full"
        } h-screen w-[85%] sm:w-[400px] bg-primary text-white shadow-xl z-50 transition-all duration-300 ease-in-out overflow-y-auto`}
        ref={sidebarRef}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between">
            <Logo logo={logo} imagePath={imagePath} />
            <X
              className="w-8 text-white cursor-pointer hover:text-secondary transition-colors"
              onClick={() => setSidebar(false)}
            />
          </div>

          {/* Recent Posts Section */}
          <div className="mt-10 hidden lg:flex ">
            <div>
              <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
                Recent Posts
              </h3>
              <div className="space-y-6">
                {lastThreeBlogs.map((item, index) => (
                  <div key={index} className="group">
                    <Link
                      title={item.title || "Article"}
                      href={`/${encodeURI(
                        sanitizeUrl(item.article_category)
                      )}/${encodeURI(sanitizeUrl(item.title))}`}
                      className="flex gap-4 items-center"
                    >
                      <div className="relative w-16 sm:w-24 h-16 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.image
                              ? `${imagePath}/${item.image}`
                              : "/no-image.png"
                          }
                          alt={
                            item?.tagline ||
                            item?.altText ||
                            "Article Thumbnail"
                          }
                          title={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm sm:text-base group-hover:text-secondary transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Links */}
          <div className="lg:hidden flex flex-col gap-4 mt-8">
            <Link
              title="Home"
              href="/"
              className="py-2 hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <div className="relative">
              <button
                title="Categories"
                className="cursor-pointer py-2 hover:text-secondary transition-colors w-full text-left"
                onClick={toggleDropdown}
              >
                Categories
              </button>

              {/* Categories Dropdown */}
              {isDropdownOpen && (
                <div className="relative bg-black/50 rounded-md mt-2 p-4 w-full grid grid-cols-1 gap-4">
                  {categories.map((category, index) => (
                    <Link
                    title={category.title || "Article Category" }
                      key={index}
                      href={`/${encodeURI(sanitizeUrl(category.title))}`}
                    >
                      <div className="flex items-center gap-3 hover:bg-black/30 p-2 rounded-lg transition">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
                          width={40}
                          height={40}
                          className="rounded-md h-10 object-cover"
                        />
                        <span className="font-medium text-sm">
                          {category.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              title="Contact"
              href="/contact"
              className="py-2 hover:text-secondary transition-colors"
            >
              Contacts
            </Link>

            <Link
              title="About"
              href="/about"
              className="py-2 hover:text-secondary transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
