import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import { sanitizeUrl } from "@/lib/myFun";

export default function MostPopular({ blog_list = [], imagePath }) {
  const popularBlogs = blog_list.filter((item) => item.isPopular);

  return (
    popularBlogs?.length > 0 && (
      <div className="py-16 text-center bg-primary ">
        <div className="px-3 py-9 md:px-9">
          <h3 className=" text-gray-400 text-lg " >Exploring the Frontiers of Technology</h3>
          <h2 className="font-bold text-4xl lg:text-6xl  text-white px-6">
            Most Popular
          </h2>
          <p className=" text-gray-400  lg:mx-96 mt-6" >Welcome to our Tech blog, your go-to destination for exploring the frontiers of technology. Here, we dive deep into the latest advancements, trends, and innovations across various tech domains, keeping you informed and inspired</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-11 mb-3">
            {popularBlogs.map((item, index) => (
              <BlogCard
                key={item.id || index}
                title={item.title}
                author={item.author}
                date={item.published_at}
                tagline={item.tagline}
                description={item.articleContent}
                image={`${imagePath}/${item.image || "no-image.png"}`}
                href={
                  `/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                    item?.title
                  )}` || "#"
                }
                category={item.article_category}
                imageTitle={item.imageTitle}
                altImage={item.altImage}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
}

function BlogCard({
  title,
  image,
  href,
  category,
  imageTitle = "Article Thumbnail",
  altImage = "No Thumbnail Found",
  tagline,
  description,
  author,
  date
}) {
  return (
    <div className="flex flex-col  transition-shadow rounded-lg overflow-hidden">
      <Link
        href={href || "#"}
        title={imageTitle}
        className="relative overflow-hidden w-full h-[350px]"
      >
        <Image
          src={image}
          title={imageTitle}
          alt={altImage || tagline}
          priority={false}
          width={298}
          height={200}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
          className="w-full h-full hover:scale-105 transition-transform duration-300"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow gap-y-4 ">
        <Link
        title={category || "Article Category"}
        className=" flex justify-start "  href={`/${sanitizeUrl(category)}`}>
          <Badge className="mb-2 inline-block text-white  ">{category}</Badge>
        </Link>
        
        <Link 
        title={title}
        href={href || ""} className="group">
          <h3 className="font-bold text-4xl lg:text-5xl text-start mb-2 text-secondary transition-colors">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="text-gray-200  text-start mb-4 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-center text-sm text-gray-200">
          {author && (
            <span className="font-medium mr-3">{author}</span>
          )}
          {date && (
            <time className="text-gray-200">
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          )}
        </div>
      </div>
    </div>
  );
}
