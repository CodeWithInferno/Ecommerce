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

function ProductCard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await client.fetch('*[_type == "product"]{title, "imageUrls": images[0..1].asset->url, description, price, slug}');
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='ml-24 mt-20 gap-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product, index) => (
                <Link href={`/products/${product.slug.current}`} key={index}>
                    <Card style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent', borderRadius: '20px'}}>
                        <CardContent>
                            {product.imageUrls && product.imageUrls.length > 1 && 
                                <div className="hover-img">
                                    <img src={urlFor(product.imageUrls[0])} alt={product} className="img-top" style={{width: '100%', height: 'auto',  objectFit: 'cover', borderRadius: '20px'}} />
                                    <img src={urlFor(product.imageUrls[1])} alt={product.title} className="img-bottom" style={{width: '100%', height: 'auto',  objectFit: 'cover', borderRadius: '20px'}} />
                                </div>
                            }
                        </CardContent>
                        <CardHeader style={{textAlign: 'left', padding: '10px 0'}}>
                            <CardTitle style={{ fontWeight: 'semibold',marginLeft:'20px', fontSize: 'small'}}>{product.title}</CardTitle>
                        </CardHeader>
                        <CardFooter style={{textAlign: 'center'}}>
                            <p className='text-black text-sm'>₹ {product.price}</p>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

export default ProductCard;