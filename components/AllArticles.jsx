import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Badge } from "./ui/badge";

export default function AllArticles({ articles, imagePath, heading , className = "px-3 md:px-9 mb-8" }) {
  const [displayCount, setDisplayCount] = React.useState(9);

  const showMoreArticles = () => {
    setDisplayCount(articles.length);
  };

  const visibleArticles = articles?.slice(0, displayCount);

  return (
    articles?.length > 0 && (
      <div className={className}>
        <div className="relative w-full mb-12">
          <div className=" w-full h-[3px] bg-gradient-to-r from-transparent via-primary1 to-transparent top-1/2"></div>
          <h2 className="relative font-bold uppercase text-4xl lg:text-5xl text-white px-8 py-3 bg-theme inline-block left-1/2 -translate-x-1/2 tracking-wider rounded-lg">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleArticles.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl bg-theme/50 backdrop-blur-sm"
            >
              <div className="relative overflow-hidden h-[400px]">
                <Link
                  href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(item?.title)}`}
                  title={item.title}
                  className="block relative h-full"
                >
                  <Image
                    title={item.imageTitle || item.title || "Article Thumbnail"}
                    alt={item.altImage || item.tagline || "No Thumbnail Found"}
                    src={`${imagePath}/${item.image}`}
                    fill={true}
                    loading="lazy"
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
                </Link>
                
                <div className="absolute bottom-0 p-6 space-y-3 w-full transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <Badge className="mb-2 inline-block text-white bg-secondary hover:bg-secondary/90 transition-colors px-4 py-1 text-sm font-medium rounded-full shadow-lg">
                    {item?.article_category}
                  </Badge>
                  
                  <Link
                    href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(item?.title)}`}
                    title={item.title}
                    className="block font-bold text-2xl leading-tight text-secondary  transition-colors duration-300"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-3 opacity-90">
                    <p className="text-sm hover:text-primary1 text-gray-200 transition-colors duration-300">
                      {item.author}
                    </p>
                    <span className="text-primary1 font-extrabold">•</span>
                    <p className="text-sm text-gray-200">
                      {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayCount < articles?.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={showMoreArticles}
              className="font-bold text-secondary border-2 border-secondary rounded-full px-6 py-3 hover:bg-secondary hover:text-white transition-colors duration-300"
            >
              See All Articles
            </button>
          </div>
        )}
      </div>
    )
  );
}
