import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

export default function MostPopular({ blog_list, imagePath }) {
  const popularBlogs = blog_list.filter((item) => item.isPopular);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <TrendingUp className="w-6 h-6 text-secondary" />
          <h2 className="text-3xl font-bold text-white">Most Popular</h2>
        </motion.div>

        {/* Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {popularBlogs?.slice(0, 6).map((blog, index) => (
            <PopularCard
              key={index}
              blog={blog}
              imagePath={imagePath}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PopularCard({ blog, imagePath, index }) {
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
    <motion.div
      variants={cardVariants}
      className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] 
                rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 
                hover:border-white/20 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={`${imagePath}/${blog.image}`}
          title={blog.title}
          alt={blog.title}
          fill={true}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Category Tag */}
        <Link
          href={`/${sanitizeUrl(blog.article_category)}`}
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium 
                   bg-secondary/20 text-secondary hover:bg-secondary/30 backdrop-blur-sm
                   transition-all duration-300 z-10"
                   title={blog.article_category}
        >
          {blog.article_category}
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link
          href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
            blog.title
          )}`}
          title={blog.title}
        >
          <h3
            className="text-xl font-semibold text-white group-hover:text-secondary 
                       transition-colors duration-300 line-clamp-2 mb-4"
          >
            {blog.title}
          </h3>
        </Link>

        <p className="text-white/60 text-sm line-clamp-2 mb-6">
          {blog.description || blog.tagline}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-white/60">
            {blog.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3" />
                <span>{blog.author}</span>
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
              blog.title
            )}`}
            className="flex items-center gap-1 text-secondary text-sm 
                     group-hover:gap-2 transition-all duration-300"
                     title={blog.title}
          >
            <span>Read</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
}
