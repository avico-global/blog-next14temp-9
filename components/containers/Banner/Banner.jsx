import React from "react";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import Link from "next/link";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";

export default function Banner({ image, data, blog_list, imagePath }) {
  return (
    <div className="relative min-h-[60svh] md:min-h-[100svh] overflow-hidden">
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="object-cover w-full h-full brightness-50"
        sizes="(max-width: 320px) 320px,
               (max-width: 3840px) 3840px,
               100vw"
      />

      <div className="relative z-10 flex flex-col min-h-[60svh] md:min-h-[100svh]">
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-20 ">
          <h1 className="font-bold capitalize text-4xl -mt-16 md:-mt-40 md:text-5xl lg:text-6xl xl:text-7xl text-white max-w-5xl leading-tight">
            {data.title}
          </h1>
          {data.tagline && (
            <p
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-relaxed text-white/90 mt-4 max-w-2xl text-lg md:text-xl"
            >
              {data.tagline}
            </p>
          )}
        </div>

        {blog_list?.length > 0 && (
          <div className="border-t hidden lg:flex  border-white/20 bg-black/30 backdrop-blur-md py-8 absolute bottom-0 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 md:mx-8 lg:mx-20">
              {blog_list
                ?.slice(-3)
                .reverse()
                .map((item, index) => (
                  <BlogCard
                    key={index}
                    {...item}
                    href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                      item?.title
                    )}`}
                  />
                ))}
            </div>
          </div>
        )}
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
    <div className="group hover:bg-white/10 rounded-lg backdrop-blur-sm p-5 transition-all duration-300">
      <div className="flex flex-col space-y-3">
        <Link
          title={article_category || "Article Category"}
          href={`/${sanitizeUrl(article_category)}`}
          className="text-white/80 text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors"
        >
          {article_category}
        </Link>

        <Link
         title={title || "Article Category"}
          href={href || ""}
          className="text-xl md:text-2xl font-bold text-white decoration-2 underline-offset-2 line-clamp-2"
        >
          {title}
        </Link>

       

        <div className="flex items-center justify-between mt-4">
          {author && <span className="text-white/70 text-sm">{author}</span>}
          <p className="text-white/70 text-sm">{date}</p>
        </div>
      </div>
    </div>
  );
}
