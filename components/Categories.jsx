import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sanitizeUrl } from '@/lib/myFun'

export default function Categories({categories, imagePath}) {
  const [bgImage, setBgImage] = useState('')

  return (
    <>
      <div 
        className="left-0 top-full rounded-md z-50 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 min-h-[300px] sm:min-h-[400px] transition-all duration-1000 mb-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${imagePath}/${bgImage || categories[0]?.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlend: 'overlay',
          transition: 'all 5s ease-in-out, background-image 5s ease-in-out'
        }}
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/${encodeURI(sanitizeUrl(category.title))}`}
            className="transition-all duration-500 border-b sm:border-b-0 sm:border-r border-gray-400 last:border-b-0 sm:last:border-r-0 hover:bg-black/20 group"
            onMouseEnter={() => setBgImage(category.image)}
            onMouseLeave={() => setBgImage('')}
          >
            <div className="flex flex-col items-center justify-center h-full transition-all duration-500 group-hover:scale-110">
              <span className="font-semibold text-white capitalize text-center text-2xl md:text-3xl lg:text-4xl transition-all duration-300 ">
                {category.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
