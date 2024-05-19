'use client';




import React, { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'vn7zew35', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: false // `false` if you want to ensure fresh data
})

const TopHero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        client.fetch('*[_type == "tophero"]').then(tophero => {
            setTexts(tophero.map(item => item.title));
        }).catch(err => {
            console.error('Oh no, error occured: ', err)
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 150);

        return () => clearInterval(timer);
    }, [texts.length]);

    const handleDragEnd = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length);
    };

    return (
        <div className='bg-black w-full h-10 text-white'>
            <Carousel activeIndex={activeIndex}>
                <CarouselContent onDragEnd={handleDragEnd}>
                    {texts.map((text, index) => (
                        <CarouselItem key={index} active={index === activeIndex} className="flex items-center mt-2 justify-center tracking-widest">
                            <h1>{text}</h1>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default TopHero;