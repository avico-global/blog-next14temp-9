import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import Image from "next/image";

import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useBreadcrumbs from "@/lib/useBreadcrumbs";

// Font
import { Raleway } from "next/font/google";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Hash, Bookmark } from "lucide-react";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";

const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Category({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  contact_details,
  favicon,
  layout,
  nav_type,
  footer_type,
}) {
  const router = useRouter();
  const { category } = router.query;

  const breadcrumbs = useBreadcrumbs();

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = sanitizeUrl(category);

    return sanitizeUrl(item.article_category) === searchContent;
  });

  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" ") || category.includes("&"))) {
      const newCategory = category
        .replace(/%20/g, "-")
        .replace(/ /g, "-")
        .replace(/&/g, "and");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact-us");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  const page = layout?.find((page) => page.page === "category");

  // Find the current category object
  const currentCategory = categories?.find(
    (cat) => sanitizeUrl(cat.title) === sanitizeUrl(category)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={cn(myFont.className, "flex flex-col min-h-screen")}>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {meta?.title?.replaceAll(
            "##category##",
            category
              ?.replaceAll("-", " ")
              .replaceAll("&", "and")
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')
          )}
        </title>
        <meta
          name="description"
          content={meta?.description.replaceAll(
            "##category##",
            category?.replaceAll("-", " ")
          )}
        />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/${category}`} />
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
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
      />

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] pt-10 flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={`${imagePath}/${currentCategory?.image}`}
              alt={currentCategory?.title || "Category"}
              fill
              className="object-cover"
              priority
              title={currentCategory?.title}
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Hash className="w-6 h-6 text-secondary" />
                <span className="text-secondary font-medium">Category</span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 
             bg-gradient-to-r from-white via-white to-secondary/80 bg-clip-text text-transparent"
              >
                {currentCategory?.title?.replaceAll("&", "and")}
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                {currentCategory?.description ||
                  `Explore all articles in ${currentCategory?.title} category`}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="relative py-20 bg-gradient-to-b from-black to-black/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <Bookmark className="w-6 h-6 text-secondary" />
                <h2 className="text-2xl font-bold text-white">
                  Latest Articles
                </h2>
              </div>
              <div className="text-white/60">{blog_list?.length} Articles</div>
            </div>

            {/* Articles Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blog_list?.map((blog, index) => (
                <ArticleCard
                  key={index}
                  blog={blog}
                  imagePath={imagePath}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <Footer
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
            },
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
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${sanitizeUrl(
                    blog?.article_category.replaceAll(" ", "-")
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

function ArticleCard({ blog, imagePath, index }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group relative bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent 
                rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 
                hover:border-white/20 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={`${imagePath}/${blog.image}`}
          alt={blog.title}
          fill={true}
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          title={blog.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Link
            href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
              blog.title
            )}`}
            className="block"
            title={blog.title}
          >
            <h3
              className="text-xl font-semibold text-white group-hover:text-secondary 
                         transition-colors duration-300 line-clamp-2"
            >
              {blog.title}
            </h3>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-4">
        <p className="text-white/60 text-sm line-clamp-2 mb-6">
          {blog.description || blog.tagline}
        </p>

        {/* Metadata and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-white/60">
            {blog.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3" />
                <span className="line-clamp-1">{blog.author}</span>
              </div>
            )}
            {blog.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <time>{blog.date}</time>
              </div>
            )}
          </div>

          <Link
            href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
              blog?.title
            )}`}
            className="flex items-center gap-1 text-secondary text-sm font-medium
                     group-hover:gap-2 transition-all duration-300 
                     hover:text-secondary/80"
            title={blog.title}
          >
            <span>Read</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hover Effects */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-secondary/10 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.article>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const banner = await callBackendApi({ domain, query, type: "banner" });
  const footer_text = await callBackendApi({
    domain,
    query,
    type: "footer_text",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_category" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  console.log("Current category:", category);
  console.log("All categories:", categories?.data[0]?.value);

  const categoryExists = categories?.data[0]?.value?.some((cat) => {
    return sanitizeUrl(cat?.title) === sanitizeUrl(category);
  });

  console.log("Category exists:", categoryExists);

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      layout: layout?.data[0]?.value || null,
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}
