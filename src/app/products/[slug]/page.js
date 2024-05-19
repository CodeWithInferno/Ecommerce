'use client';
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import TopHero from "@/components/tophero"
import BlockContent from "@sanity/block-content-to-react";

const client = sanityClient({
  projectId: "vn7zew35",
  dataset: "production",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

async function getData(slug) {
  const query = `
    *[_type == "product" && slug.current == '${slug}'] {
      title,
      description,
      price,
      size,
      "categoryTitle": category->title,
      "imageUrls": images[].asset->url
    }[0]
  `;
  const data = await client.fetch(query);
  return data;
}

export default function ProductDetails({ params }) {
    const { slug } = params || {};
    const [data, setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
  
    useEffect(() => {
      getData(slug).then((data) => {
        setData(data);
        setSelectedImage(data.imageUrls[0]); // Set the first image as the selected image
      });
    }, [slug]);

  if (!data)
    return (
      <div className="bg-white text-black min-h-screen h-full bg-no-repeat">
        Loading...
      </div>
    );

return (
  <div className="bg-white text-black">
    <TopHero />
    <Header />

    <div className="bg-white text-black min-h-screen h-full bg-no-repeat flex flex-col items-start">
      <div className="mt-12 w-full mb-28 max-w-4xl px-8 py-6 flex justify-start">
        <div className="flex flex-col items-start gap-1">
          {data.imageUrls.map((url, index) => (
            <button key={index} onClick={() => setSelectedImage(url)}>
              <img className={`my-1 rounded w-32 h-auto ${selectedImage === url ? 'border-2 border-black' : ''}`} src={url} alt="" />
            </button>
          ))}
        </div>
        <div className="flex ml-7">
          {selectedImage && <img className="w-[60%] h-auto rounded mr-4" src={selectedImage} alt="" />}
          <div>
            <h2 className="text-2xl font-normal ml-5 flex-shrink-0">{data.title}</h2>
            <div className="mt-2">
              <p className="text-xl ml-5 font-normal">Rs. {data.price}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}