import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";

export default function Banner({ image, data }) {
  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      <Image

        src={"/img/lynx.webp" || image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="object-cover w-full h-full"
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
      <div className="relative z-10 gap-5 text-start justify-centerv items-center px-20 py-36">
        <h1
          // style={{ fontSize: data.titleFontSize || 60 }}
          className="font-bold  capitalize text-6xl text-white text-start"
        >
          {data.title}
        </h1>
        {data.tagline && (
          <p
            style={{ fontSize: data.taglineFontSize || 18 }}
            className="leading-tight md:leading-none"
          >
            {data.tagline}
          </p>
        )}
      </div>
    </div>
  );
}
