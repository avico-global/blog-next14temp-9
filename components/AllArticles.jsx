import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export default function AllArticles({ blog_list, imagePath }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-black/95 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-bold text-white">All Articles</h2>
          </div>
          <div className="text-white/60">{blog_list?.length || 0} Articles</div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Category Tag */}
        <Link
          href={`/blog/${sanitizeUrl(blog.article_category)}`}
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium 
                   bg-secondary/20 text-secondary hover:bg-secondary/30 backdrop-blur-sm
                   transition-all duration-300 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {blog.article_category}
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Link
            href={`/blog/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
              blog.title
            )}`}
            className="block"
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
            href={`/blog/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(
              blog.title
            )}`}
            className="flex items-center gap-1 text-secondary text-sm font-medium
                     group-hover:gap-2 transition-all duration-300 
                     hover:text-secondary/80"
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
