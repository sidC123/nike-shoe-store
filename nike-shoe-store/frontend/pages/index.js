import BestQuality from "@/components/bestQuality/BestQuality";
import Hero from "@/components/heroBanner/Hero";
import PopularProducts from "@/components/popularProducts/PopularProducts";
import Services from "@/components/servicesSection/Services";
import SpecialOffer from "@/components/specialOffer/SpecialOffer";
import Testimonial from "@/components/testimonial/Testimonial";
import Subscription from "@/components/subscription/Subscription";
import Wrapper from "@/components/wrapper/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

export default function Home({ products }) {
  return (
    <>
      <main className='min-h-screen'>
        <>
          <Hero />

          <Wrapper className="pt-24">
            <PopularProducts
              titlePrev="Nike's"
              coloredTitle="Popular"
              titleRest="Products"
              productsData={products?.data}
            />
          </Wrapper>

          <Wrapper className="pt-24">
            <BestQuality />
          </Wrapper>

          <Wrapper className="pt-24">
            <Services />
          </Wrapper>

          <Wrapper className="py-24 ">
            <SpecialOffer />
          </Wrapper>

          <section className="bg-pale-blue padding">
            <Testimonial />
          </section>

          <section className="padding-x sm:py-32 py-16 w-full">
            <Subscription />
          </section>
        </>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const products = await fetchDataFromApi('/api/products?populate=*');
  // console.log(await products);
  return {
    props: { products: products }
  }
}
