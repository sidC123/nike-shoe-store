import { useRouter } from "next/router";
import { products } from "@/constants/";
import PopularProductCard from "@/components/popularProductCard/PopularProductCard";
import Wrapper from "@/components/wrapper/Wrapper";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetchDataFromApi } from "@/utils/api";
const maxResult = 3;

const Category = ({ category, products, slug }) => {
    const [pageIndex, setPageIndex] = useState(1);
    const { query } = useRouter();

    useEffect(() => {
        setPageIndex(1);
    }, [query]);

    const { data, error, isLoading } = useSWR(
        `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
        fetchDataFromApi,
        {
            fallbackData: products,
        }
    );

    return (
        <Wrapper className="py-5">
            <h1
                className="w-full text-center text-xl md:text-2xl lg:text-3xl capitalize font-bold">
                {category?.data?.[0]?.attributes?.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 mb-14 px-5 md:px-0">
                {data?.data?.map((product) => (
                    <PopularProductCard key={product?.id} data={product} />
                ))}
            </div>

            {/* PAGINATION BUTTONS START */}
            {data?.meta?.pagination?.total > maxResult && (
                <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                    <button
                        className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                        disabled={pageIndex === 1}
                        onClick={() => setPageIndex(pageIndex - 1)}
                    >
                        Previous
                    </button>

                    <span className="font-bold">{`${pageIndex} of ${data && data.meta.pagination.pageCount
                        }`}
                    </span>

                    <button
                        className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                        disabled={
                            pageIndex ===
                            (data && data.meta.pagination.pageCount)
                        }
                        onClick={() => setPageIndex(pageIndex + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
            {/* PAGINATION BUTTONS END */}
        </Wrapper>
    )
}

export default Category;

export async function getStaticPaths() {
    const category = await fetchDataFromApi("/api/categories?populate=*");
    const paths = category?.data?.map((c) => ({
        params: {
            slug: c.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const category = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`);
    const products = await fetchDataFromApi(
        `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
    );

    return {
        props: {
            category,
            products,
            slug,
        },
    };
}