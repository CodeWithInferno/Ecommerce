// // page.js
'use client';
// import { useState, useEffect, Suspense } from 'react';
// import sanityClient from '@sanity/client';
// import imageUrlBuilder from '@sanity/image-url';
// import { Fade } from 'react-awesome-reveal';
// import dynamic from 'next/dynamic';

// const ImageWithLoading = dynamic(() => import('../components/ImageWithLoading'));

// const client = sanityClient({
//   projectId: 'vn7zew35',
//   dataset: 'production',
//   useCdn: false, // Enable if you want to use the CDN
// });

// const builder = imageUrlBuilder(client);

// function urlFor(source) {
//   return builder.image(source);
// }

// export default function ImageGallery() {
//   const [images, setImages] = useState([]);
  
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const imageData = await client.fetch('*[_type == "banner"]{alt, link, "imageUrl": image.asset->url}');
//         setImages(imageData);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className='bg-white text-black min-h-screen h-full bg-no-repeat'>  
//     <div className="grid grid-cols-3 gap-y-5 mb-10 mt-10 ml-20">
//         {images.map((image, index) => (
//         <Fade key={index}>
//             <div className="relative w-9/12 h-1/12">
//             <Suspense fallback={<div className="bg-gray-200 w-9/12 h-1/12"></div>}>
//                 <ImageWithLoading src={image.imageUrl} alt={image.title} />
//             </Suspense>
//             </div>
//         </Fade>
//         ))}
//     </div>
  
//     </div>
//   );
//   }






















import React, { useState, useEffect, Suspense } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import dynamic from 'next/dynamic';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import './multirender/css/banner.css';

const ImageWithLoading = dynamic(() => import('../components/ImageWithLoading'));

const client = sanityClient({
  projectId: 'vn7zew35',
  dataset: 'production',
  useCdn: true, // Enable if you want to use the CDN
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await client.fetch('*[_type == "banner"]{alt, link, "imageUrl": image.asset->url}');
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);



  return (
    <div className='bg-white text-black mt-0 h-[700px] bg-no-repeat overflow-hidden'>  
      <Carousel className="relative h-full">
        <CarouselPrevious className="absolute left-0 z-10 carousel-arrow carousel-arrow-left" />
        <CarouselContent className="w-full h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <div className="relative w-full h-full">
                <a href={image.link} className="w-full h-full block">
                  <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-0 z-10 carousel-arrow carousel-arrow-right" />
      </Carousel>
    </div>
  );
}