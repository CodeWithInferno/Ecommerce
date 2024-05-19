'use client';

import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const client = sanityClient({
    projectId: 'vn7zew35',
    dataset: 'production',
    useCdn: false, // Enable if you want to use the CDN
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source);
}

function ProductCard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await client.fetch('*[_type == "product"]{title, "imageUrl": images[0].asset->url, description, price}');
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='ml-24 mt-20 gap-1 grid grid-cols-4'>
            {products.map((product, index) => (
                <Card key={index} style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent', borderRadius: '20px'}}>
                    <CardContent>
                        {product.imageUrl && <img src={urlFor(product.imageUrl)} alt={product.title} style={{width: '100%', height: 'auto',  objectFit: 'cover', borderRadius: '20px'}} />}
                    </CardContent>
                    <CardHeader style={{textAlign: 'left', padding: '10px 0'}}>
                        <CardTitle style={{ fontWeight: 'normal',marginLeft:'15px'}}>{product.title}</CardTitle>
                    </CardHeader>
                    <CardFooter style={{textAlign: 'center'}}>
                        <p className='text-black text-sm'>₹ {product.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default ProductCard;