import Image from "next/image";
import Header from "@/components/header";
import TopHero from '@/components/tophero';
import Banner from '@/components/banner';
import ProductCard from '@/components/multirender/productcard';


export default function Home() {
  return (
    <main>
        <TopHero />
        <Header />
        <Banner  />
        <ProductCard />
     </main> 
  );
}
