import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Menu, Search, X } from "lucide-react";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

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
  const sidebarRef = useRef(null); // Add a ref for the sidebar

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
      <div className="w-full absolute top-0 left-0 z-50 text-white shadow-sm">
        <div className="flex items-center justify-between gap-3 mx-auto pt-6 pb-6 px-20 max-w-full">
          <div className="">
            <Logo logo={logo} imagePath={imagePath} />
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
                <div className="absolute left-0 top-full bg-black shadow-xl rounded-md z-50 p-4 w-[500px] grid grid-cols-2 gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/${encodeURI(sanitizeUrl(category.title))}`}
                      className="hover:bg-secondary rounded-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 p-2">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
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
              className="flex items-center justify-end gap-3 text-gray-500 relative "
              ref={searchContainerRef}
            >
              <div className="flex items-center justify-end gap-2">
                <Search
                  className="w-5 md:w-4 text-white font-bold cursor-pointer"
                  onClick={handleSearchToggle}
                />
              </div>
              {openSearch && (
                <>
                  {searchQuery && (
                    <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                      {filteredBlogs?.map((item, index) => (
                        <Link
                          title={item.title}
                          key={index}
                          href={`/${item.article_category.name}/${item.key}`}
                        >
                          <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
                    placeholder="Search..."
                  />
                </>
              )}
            </div>
            <Menu
              onClick={() => setSidebar(true)}
              className="cursor-pointer w-8"
            />
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-primary text-white shadow-xl z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
        ref={sidebarRef}
      >
        <div>
          <div className="flex items-center justify-between">
            <Logo logo={logo} imagePath={imagePath} />
            <X
              className="w-8 text-white cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>

          <div className="pt-32 hidden lg:flex flex-col items-center p-2">
            <div className="lg:flex lg:flex-col">
              {lastThreeBlogs.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-widget1 gap-4 py-3 border-b last:border-none"
                >
                  <Link
                    title={item.title || "Article"}
                    href={`/${encodeURI(
                      sanitizeUrl(item.article_category)
                    )}/${encodeURI(sanitizeUrl(item.title))}`}
                  >
                    <div className="overflow-hidden relative min-h-20 w-full bg-black flex-1 rounded-full">
                      <Image
                        title={
                          item?.imageTitle || item?.title || "Article Thumbnail"
                        }
                        alt={
                          item?.tagline || item?.altText || "Article Thumbnail"
                        }
                        src={
                          item.image
                            ? `${imagePath}/${item.image}`
                            : "/no-image.png"
                        }
                        fill
                        loading="lazy"
                        className="object-cover hover:scale-125 transition-all"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div>
                    <Link
                      title={item.title || "Article Link"}
                      href={`/${encodeURI(
                        sanitizeUrl(item.article_category)
                      )}/${encodeURI(sanitizeUrl(item.title))}`}
                    >
                      <p className="font-semibold leading-tight ">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Menu Links */}
          <div className="flex lg:hidden text-2xl flex-col gap-6 mt-16">
            <Link title="Home" href="/">
              Home
            </Link>
            <div className="relative">
              <button
                title="Categories"
                className="cursor-pointer"
                onClick={toggleDropdown}
              >
                Categories
              </button>

              {/* Categories Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full bg-white text-black shadow-lg rounded-md z-50 p-4 w-[300px]  grid grid-cols-1 gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/${encodeURI(sanitizeUrl(category.title))}`}
                    >
                      <div className="flex items-center  gap-4 hover:bg-gray-100 p-2 transition">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
                          width={60}
                          height={100}
                          className="rounded-md"
                        />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link title="Contact" href="/contact">
              Contacts
            </Link>

            <Link
              title="About"
              href="/about"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Styles */}
      <style jsx>{`
        .sidebar {
          width: 0;
          transition: width 0.3s ease;
        }
        .sidebar.open {
          width: 300px;
        }
        @media only screen and (max-width: 600px) {
          .sidebar.open {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
