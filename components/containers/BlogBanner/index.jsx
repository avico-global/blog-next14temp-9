import React from "react";
import Image from "next/image";

export default function BlogBanner({ myblog, imagePath }) {
  return (
    <div className="relative min-h-screen mt-3 mx-auto max-w-full text-white">
      {/* Background Image */}
      <Image
        src={`${imagePath}/${myblog?.file_name}`}
        alt={
          myblog?.value.imageAltText ||
          myblog?.value?.tagline ||
          "No Banner Found"
        }
        title={myblog?.value.imageTitle || myblog?.value.title}
        priority={true}
        fill={true}
        loading="eager"
        className="w-full h-full object-cover"
        sizes="(max-width: 320px) 320px,
         (max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         (max-width: 1280px) 1280px,
         (max-width: 1600px) 1600px,
         (max-width: 1920px) 1920px,
         (max-width: 2560px) 2560px,
         (max-width: 3840px) 3840px,
         100vw"
      />

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center md:px-8 lg:px-20  justify-start bg-gradient-to-t from-black/60 to-transparent">
        <div className="px-4 lg:px-6">
          <p className="font-bold">{myblog?.value?.article_category}</p>

          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 50 }}
            className=" capitalize font-extrabold text-white"
          >
            {myblog?.value.title}
          </h1>
          <div className="text-gray-300 flex items-center gap-4 mt-2 mb-4">
            <p>{myblog?.value?.author}</p>
            <span className="text-button"> -- </span>
            <p>{myblog?.value.published_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
