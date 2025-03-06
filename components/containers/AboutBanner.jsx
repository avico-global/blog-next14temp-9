import React from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Container from "../common/Container";

export default function AboutBanner({ image }) {
  console.log("Full image URL:", image);
  return (
    <FullContainer className="h-80 overflow-hidden p-10 text-white text-center relative">
      {image ? (
        <div className="absolute inset-0">
          <Image
            src={image}
            title="About Us"
            alt="About Us Banner Not Found"
            priority={true}
            fill={true}
            loading="eager"
            quality={100}
            className="object-cover"
            sizes="100vw"
            placeholder="empty"
            blurDataURL={image}
            onError={(e) => {
              console.error('Image failed to load:', e);
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-800" />
      )}
      <Container className="relative z-10 gap-6">
        <h1 className="font-extrabold text-6xl capitalize max-w-screen-md">
          About Us
        </h1>
      </Container>
    </FullContainer>
  );
}
