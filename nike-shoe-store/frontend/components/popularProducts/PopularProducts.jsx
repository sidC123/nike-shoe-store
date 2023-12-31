import PopularProductCard from "@/components/popularProductCard/PopularProductCard";
import { products } from "@/constants/index";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import s from "./PopularProducts.module.scss"

const PopularProducts = ({ titlePrev, coloredTitle, titleRest, subtitle, productsData }) => {
    // console.log(productsData);
    return (
        <section id='products' className="max-container max-sm:mt-12">
            <div className="flex flex-col justify-start gap-5">
                <h2 className="text-4xl font-Jost font-bold">
                    {titlePrev && titlePrev} <span className="text-primary">{coloredTitle && coloredTitle}</span> {titleRest && titleRest}
                </h2>
                {
                    subtitle &&
                    <p className="lg:max-w-lg mt-2 font-montserrat">Unveiling the Best: Elevate your style and performance with our top picks from Nike&apos;s collection of sought-after products.</p>
                }
            </div>

            <Swiper
                style={{
                    '--swiper-navigation-color': '#FF6452',
                    '--swiper-pagination-color': '#FF6452',
                }}
                spaceBetween={10}
                slidesPerView={3}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                speed={1200}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={`${s.popularProductsSwiper}`}
            >
                {productsData && productsData.map((product) => (
                    <SwiperSlide key={product?.id}>
                        <PopularProductCard
                            data={product}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default PopularProducts
