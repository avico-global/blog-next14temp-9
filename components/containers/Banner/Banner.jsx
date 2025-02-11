import React from "react";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import Link from "next/link";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";

export default function Banner({ image, data, blog_list, imagePath }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="object-cover w-full h-full opacity-80"
        sizes="(max-width: 320px) 320px,
               (max-width: 3840px) 3840px,
               100vw"
      />

      <div className="relative z-10 flex flex-col items-start justify-center h-screen px-4 md:px-8 lg:px-20">
        <h1 className="font-bold capitalize text-4xl md:text-5xl lg:text-6xl text-white max-w-5xl">
          {data.title}
        </h1>
        {data.tagline && (
          <p
            style={{ fontSize: data.taglineFontSize || 18 }}
            className="leading-relaxed text-white mt-4 max-w-2xl"
          >
            {data.tagline}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full mt-20 md:mt-40">
          {blog_list
            ?.slice(-3)
            .reverse()
            .map((item, index) => (
              <BlogCard
                key={index}
                title={item.title}
                article_category={item.article_category}
                href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                  item?.title
                )}`}
                author={item.author}
                date={item.published_at}
                imageTitle={item.imageTitle || item.title || "Article Thumbnail"}
                altImage={item.altImage}
                tagline={item.tagline}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function BlogCard({
  title,
  article_category,
  image,
  href,
  imageTitle,
  altImage,
  tagline,
  date,
  author,
}) {
  return (
    <div className="group bg-black/20 backdrop-blur-sm p-6 rounded-xl hover:bg-black/30 transition-all duration-300">
      <div className="flex flex-col gap-3">
        <Link
          href={`/${sanitizeUrl(article_category)}`}
          className="text-white/80 text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors"
        >
          {article_category}
        </Link>

        <Link 
          href={href || ""} 
          className="text-xl md:text-2xl font-bold text-white  decoration-2 underline-offset-2"
        >
          {title}
        </Link>

        <p className="text-white/70 text-sm mt-auto">{date}</p>
      </div>
    </div>
  );
}
