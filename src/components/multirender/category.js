'use client';






import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import './css/productcard.css'

const client = sanityClient({
    projectId: 'vn7zew35',
    dataset: 'production',
    useCdn: false, // Enable if you use the CDN
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source);
}

function Category() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await client.fetch('*[_type == "category"]{title, "imageUrl": image.asset->url, description, slug}');
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='text-center justify-center text-4xl font-semibold'>
            <h1>Season Special 🌤️</h1>
        <div className='ml-10 mr-10 mt-10 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product, index) => (
                <Link href={`/collections/${product.slug.current}`} key={index}>
                    <Card style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent', borderRadius: '20px', position: 'relative'}}>
                        <CardContent>
                            {product.imageUrl && 
                                <img className="zoom-on-hover" src={urlFor(product.imageUrl)} alt={product.title} style={{width: '100%', height: 'auto',  objectFit: 'cover', borderRadius: '20px', transition: 'transform 0.3s ease-in-out'}} />
                            }
                            <CardTitle style={{  position: 'absolute', bottom: '30px', left: '30px', color: 'white', padding: '2px 5px'}}>{product.title}</CardTitle>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
        </div>
    );
}

export default Category;