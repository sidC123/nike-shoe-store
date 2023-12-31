"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Wrapper from '@/components/wrapper/Wrapper';
import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from 'react';
import PopularProducts from '@/components/popularProducts/PopularProducts';
import { fetchDataFromApi } from '@/utils/api';
import Image from 'next/image';
import { getDiscountedPricePercentage } from '@/utils/helper';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "@/store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
    const [selectedSize, setSelectedSize] = useState();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [showError, setShowError] = useState(false);
    const p = product?.data?.[0]?.attributes

    const dispatch = useDispatch()

    const notify = () => {
        toast.success("Product added to cart!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <Wrapper className="py-5">
            <ToastContainer />
            <section className='flex relative max-md:flex-col gap-4 xl:gap-16 produdctDetails mb-12'>
                {/* Left column for Images */}
                <div className='w-full h-full sticky top-[90px] md:w-[50%] lg:w-[40%] flex flex-col gap-[10px]'>
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#FF6452',
                            '--swiper-pagination-color': '#FF6452',
                        }}
                        loop={true}
                        spaceBetween={0}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="productSwiper w-full"
                    >
                        {
                            p.image.data && p.image.data.map((img) => (
                                <SwiperSlide
                                    key={img.id}
                                >
                                    <Image
                                        src={img.attributes.url}
                                        width={500}
                                        height={500}
                                        alt={img.attributes.name}
                                        className='w-full h-full aspect-square object-cover object-center'
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="productThumbSwiper w-full"
                    >
                        {
                            p.image.data && p.image.data.map((img) => (
                                <SwiperSlide
                                    className='overflow-hidden rounded-md'
                                    key={img.id}
                                >
                                    <Image
                                        src={img?.attributes?.formats?.thumbnail?.url}
                                        width={500}
                                        height={500}
                                        alt={img.attributes.name}
                                        className='w-full h-full aspect-square object-cover object-center'
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

                {/* Right Column for Description */}
                <div className='w-full'>
                    {/* PRODUCT TITLE */}
                    <h2 className="text-[34px] font-semibold mb-2 leading-tight">
                        {p.name}
                    </h2>

                    {/* PRODUCT SUBTITLE */}
                    <p className="text-lg font-semibold mb-5">
                        {p.subtitle}
                    </p>

                    {/* PRODUCT PRICE */}
                    <div className="flex items-center gap-1">
                        <p className="mr-2 text-lg font-semibold">
                            MRP : &#8377; {p.price}
                        </p>
                        {p.original_price && (
                            <>
                                <p className="text-base font-medium line-through">
                                    &#8377;{p.original_price}
                                </p>
                                <p className="ml-auto text-base font-medium text-green-500">
                                    {getDiscountedPricePercentage(
                                        p.original_price,
                                        p.price
                                    )}
                                    % off
                                </p>
                            </>
                        )}
                    </div>

                    <div className=" font-medium text-black/[0.5]">
                        incl. of taxes
                    </div>
                    <div className=" font-medium text-black/[0.5] mb-12">
                        {`(Also includes all applicable duties)`}
                    </div>

                    {/* PRODUCT SIZE RANGE START */}
                    <div className="mb-10">
                        {/* HEADING START */}
                        <div className='flex justify-start md:justify-between gap-5 mb-2'>
                            <div className='font-semibold cursor-pointer'>
                                Select Size
                            </div>
                            <div className='font-medium text-black/[0.5] cursor-pointer'>
                                Select Guide
                            </div>
                        </div>
                        {/* HEADING END */}

                        {/* SIZE START */}
                        <div
                            id="sizesGrid"
                            className="grid lg:grid-cols-5 grid-cols-4 gap-2"
                        >
                            {p.size.data.map((item, i) => (
                                <div
                                    key={i}
                                    disabled
                                    className={`border-2 bg-slate-100 transition-all duration-300 rounded-md text-center py-3 font-medium 
                                    ${item.enabled
                                            ? "hover:border-black cursor-pointer"
                                            : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                        } ${selectedSize === item.size
                                            ? "border-black bg-slate-400 font-semibold"
                                            : ""
                                        }`}
                                    onClick={() => {
                                        if (item.enabled) {
                                            setSelectedSize(item.size);
                                            setShowError(false);
                                        }
                                    }}
                                >
                                    {item.size}
                                </div>
                            ))}
                        </div>
                        {/* SIZE END */}

                        {/* SHOW ERROR START */}
                        {showError && (
                            <div className="text-red-600 mt-1">
                                Size selection is required
                            </div>
                        )}
                        {/* SHOW ERROR END */}
                    </div>
                    {/* PRODUCT SIZE RANGE END */}


                    <div className='flex gap-4 items-center sm:flex-row flex-col mb-10'>
                        {/* ADD TO CART BUTTON START */}
                        <button
                            className="w-full py-4 rounded-full border border-primary bg-primary text-white text-lg font-medium transition-transform active:scale-95 hover:opacity-75"
                            onClick={() => {
                                if (!selectedSize) {
                                    setShowError(true);
                                    document
                                        .getElementById("sizesGrid")
                                        .scrollIntoView({
                                            block: "center",
                                            behavior: "smooth",
                                        });
                                } else {
                                    dispatch(
                                        addToCart({
                                            ...product?.data?.[0],
                                            selectedSize,
                                            oneQuantityPrice: p.price,
                                        })
                                    );
                                    notify();
                                }
                            }}
                        >
                            Add to Cart
                        </button>
                        {/* ADD TO CART BUTTON END */}

                        {/* WHISHLIST BUTTON START */}
                        <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75">
                            Whishlist
                            <IoMdHeartEmpty size={20} />
                        </button>
                        {/* WHISHLIST BUTTON END */}
                    </div>

                    {/* PRODUCT DESCRIPTION START */}
                    <div>
                        <p className="text-lg font-bold mb-5">
                            Product Details
                        </p>
                        <div className="markdown text-md mb-5">
                            {p.desc}
                        </div>
                    </div>
                    {/* PRODUCT DESCRIPTION END */}
                </div>
            </section>

            <section className='mb-12'>
                <PopularProducts
                    coloredTitle="Recommended"
                    titleRest="for you"
                    productsData={products?.data}
                />
            </section>
        </Wrapper>
    )
}

export default ProductDetails;


export async function getStaticPaths() {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const product = await fetchDataFromApi(`/api/products?populate=*&filters[slug][$eq]=${slug}`);
    const products = await fetchDataFromApi(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    return {
        props: {
            product,
            products,
        },
    };
}