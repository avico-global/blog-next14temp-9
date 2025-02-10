import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";

export default function Banner({ image, data }) {
  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="object-cover w-full h-full"
        sizes="(max-width: 320px) 320px,
               (max-width: 3840px) 3840px,
               100vw"
      />
      <div className="relative z-10 flex flex-col items-start justify-center  text-center px-20 py-36">
        <h1 className="font-bold capitalize text-6xl text-white">
          {data.title}
        </h1>
        {data.tagline && (
          <p
            style={{ fontSize: data.taglineFontSize || 18 }}
            className="leading-tight md:leading-none text-white mt-4"
          >
            {data.tagline}
          </p>
        )}
      </div>

      {/* <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 justify-end gap-8 px-20 pb-20">
        {[1, 2, 3].map((item) => (
          <div key={item} className=" text-white p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-2">Blog Title {item}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Category {item}</span>
              <span>•</span>
              <span>Jan {item}, 2024</span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
