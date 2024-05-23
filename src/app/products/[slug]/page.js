"use client";

// ProductDetails.js
import React, { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import ProductCard from "@/components/multirender/productcard" 
import Cart from "@/components/cart";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import TopHero from "@/components/tophero";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      offers,
      description,
      price,
      "sizes": sizes[]->name,
      "imageUrls": images[].asset->url
    }[0]
  `;
  const data = await client.fetch(query);
  return data;
}

export default function ProductDetails({ params }) {
  const { slug } = params || {};
  const [data, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const addToCart = () => {
    setCartItems([...cartItems, data]);
    setIsOpen(false);
  };

  useEffect(() => {
    getData(slug).then((data) => {
      setData(data);
      setSelectedImage(data.imageUrls[0]); 
    });
  }, [slug]);

  if (!data) return <div className="justify-center items-center">Loading...</div>;

  return (
  <div>
    <TopHero />
    <Header />

    <div className="flex">
      <div>
        <ScrollArea className="h-full w-auto rounded-md p-4">
          <div className="flex flex-col space-y-4 ml-5 w-auto">
            {data.imageUrls.map((url, index) => (
              <img
                key={index}
                src={urlFor(url)}
                alt=""
                onClick={() => setSelectedImage(url)}
                className={`w-24 mt-10 h-auto object-cover ${url === selectedImage ? "border-2 border-blue-500" : ""}`}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <img
        src={urlFor(selectedImage)}
        className="w-96 h-auto object-cover ml-5 mt-10"
        alt=""
      />
      <div className="w-8/12 mr-2">
        <h1 className="ml-5 mt-10 font-light text-3xl">{data.title}</h1>
        <p className="ml-5 mt-7">
          <span className="font-medium">Rs. </span>
          {data.price}
        </p>
        <p className="ml-5 ">(Including all taxes)</p>
        <ul className="ml-5 mt-5 mb-5 font-light">
          {data.offers.map((offer, index) => (
            <li key={index}>
              <img src="/percent.svg" alt="arrow" className="inline-block mr-2 text-sm w-8 h-8" />
              <strong className="font-bold">{offer.title}</strong>
              <p className="ml-10">{offer.description}</p>
            </li>
          ))}
        </ul>
          <div className="text-black  flex gap-x-4 flex-row w-11/12 h-10 ml-5">
            {data && data.sizes && data.sizes.map((size, index) => (
              <div
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 border cursor-pointer items-center justify-center pt-2 text-center rounded-md ${
                  size === selectedSize ? "bg-black text-white" : "text-black border-black"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        <Collapsible>
          <CollapsibleTrigger className="ml-5 w-11/12 border-t text-left pl-10 border-b py-2 border-black mt-4 text-black ">
            Product Description
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 ml-5 w-11/12 text-black bg-transparent border">
            <BlockContent blocks={data.description} />
          </CollapsibleContent>
        </Collapsible>
        <Button className="ml-5 mt-5 w-11/12 hover:bg-transparent bg-white  border border-black text-pink-400">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
        ‎ ‎  Add To Whishlist
        </Button>
        <Button className="ml-5 mt-5 w-11/12 hover:bg-black" onClick={addToCart}>Add To Cart</Button>
      </div>
      
    </div>
    <div className="text-center justify-center items-center mt-40">
      <h1 className="text-4xl font-mono">YOU MAY ALSO LIKE</h1>
      <ProductCard />
      {/* <Cart cartItems={cartItems} setIsOpen={setIsOpen} /> */}
    </div>
  </div>
  );
}
