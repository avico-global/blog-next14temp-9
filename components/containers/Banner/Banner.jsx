import React from "react";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Banner({ image, data, blog_list, imagePath }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Add scroll-based parallax effect
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ 
          scale: 1,
          y: scrollY * 0.5 // This creates the parallax effect
        }}
        transition={{ 
          scale: { duration: 1.5 },
          y: { type: "spring", stiffness: 100 }
        }}
        style={{ y: scrollY * 0.5 }}
      >
        <Image
          src={image}
          title={data.imageTitle || data.title || "Banner"}
          alt={data.altImage || data.tagline || "No Banner Found"}
          priority={true}
          fill={true}
          loading="eager"
          className="object-cover w-full h-full transform scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        {/* Animated overlay pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
      </motion.div>

      <div className="relative z-10 flex flex-col min-h-[100vh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-20 pt-24"
        >
          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm 
                         border border-white/20 text-white/90 mb-8"
            >
              {data.subtitle || "Welcome to our blog"}
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-bold capitalize text-5xl md:text-7xl 
                       text-white leading-tight mb-8
                       [text-shadow:_2px_2px_10px_rgb(0_0_0_/_40%)]
                       bg-gradient-to-r from-white via-white/90 to-secondary bg-clip-text text-transparent"
            >
              {data.title}
            </motion.h1>

            {data.tagline && (
              <motion.p
                variants={itemVariants}
                className="text-lg  md:text-xl text-white/80 
                         max-w-3xl mx-auto leading-relaxed mb-12
                         [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
              >
                {data.tagline}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Blog Cards Section */}
        {blog_list?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full backdrop-blur-md bg-gradient-to-t from-black to-transparent"
          >
            <div className="max-w-screen-xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blog_list
                  ?.slice(-3)
                  .reverse()
                  .map((item, index) => (
                    <BlogCard
                      key={index}
                      {...item}
                      href={`/blog/${sanitizeUrl(
                        item.article_category
                      )}/${sanitizeUrl(item?.title)}`}
                      delay={index * 0.2}
                    />
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ title, article_category, href, date, author, delay }) {
  return (
    <Link href={href} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -5 }}
        className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-white/10 to-white/5 
                  backdrop-blur-lg border border-white/10 hover:border-white/20 
                  transition-all duration-500 cursor-pointer"
      >
        <div className="p-5 relative">
          {/* Category Tag */}
          <div
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/blog/${sanitizeUrl(article_category)}`;
            }}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                     bg-secondary/20 text-secondary hover:bg-secondary/30 
                     transition-all duration-300 mb-3 cursor-pointer"
          >
            <span title={article_category || "Article Category"}>
              {article_category}
            </span>
          </div>

          {/* Title */}
          <h3
            title={title || "Article Title"}
            className="text-lg font-bold text-white line-clamp-2 mb-3 
                     group-hover:text-secondary transition-colors duration-300"
          >
            {title}
          </h3>

          {/* Metadata */}
          <div className="flex items-center gap-4 mt-3 text-xs text-white/70">
            {author && (
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3" />
                <span>{author}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <time>{date}</time>
              </div>
            )}
          </div>

          {/* Read More */}
          <div
            className="mt-4 flex items-center gap-2 text-secondary text-sm 
                       group-hover:gap-3 transition-all duration-300"
          >
            <span className="font-medium">Read More</span>
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Hover Effects */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </motion.div>
    </Link>
  );
}
