import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BlogCard = ({
  href,
  image,
  title,
  tagline,
  altImage,
  className,
  imageTitle,
  imageHeight,
  published_at,
}) => {
  const encodedHref = href ? encodeURI(href) : "#";

  return (
    <div
      className={cn("flex flex-col items-center text-center h-fit", className)}
    >
      <Link
        title={imageTitle}
        href={encodedHref}
        className={cn("relative overflow-hidden w-full", imageHeight)}
      >
        <Image
          src={image}
          width={331}
          height={parseInt(imageHeight, 10) || 420}
          loading="eager"
          alt={altImage}
          priority={true}
          title={imageTitle}
          className="w-full h-full absolute top-0 hover:scale-125 transition-all"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="flex flex-col items-center gap-2 mt-3">
        <Link
          className="font-extrabold md:text-lg leading-tight hover:underline"
          title={title}
          href={encodedHref}
        >
          {title}
        </Link>
        <p className="text-sm font-medium text-gray-700">{published_at}</p>
      </div>
      <p className="mt-3 text-xs md:hidden">{tagline.slice(0, 100)}</p>
      <p className="mt-3 text-sm hidden md:block">{tagline}</p>
      <Link href={encodedHref} className="mt-3">
        <Button className="rounded-full">Read Article</Button>
      </Link>
    </div>
  );
};

export default BlogCard;
