import { star } from "@/assets/icons";
import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

const PopularProductCard = ({ data: { attributes: p, id } }) => {
    // console.log(p);
    return (
        <Link
            href={`/product/${p.slug}`}
            className="flex flex-1 flex-col w-full max-sm:w-full p-2 rounded-xl border-2 shadow"
        >
            <div className="w-full aspect-square overflow-hidden rounded-xl">
                <Image src={p.thumbnail?.data?.attributes?.url} alt={p.name} width={100} height={100} className="w-full aspect-square transition-all duration-500 ease-in-out hover:-rotate-3 hover:scale-[1.1]" />
            </div>

            <div className="mt-3 flex flex-col gap-3 px-1">
                <div className="flex justify-between items-center gap-3">
                    <h3 className="text-2xl font-semibold font-Jost line-clamp-1 text-clip">
                        {p.name}
                    </h3>
                    <div className="flex items-center gap-1 min-w-fit">
                        <Image width={25} height={25} className="w-[25px]" src={star} />
                        <span className="font-semibold text-lg">4.5</span>
                    </div>
                </div>

                <div className="flex itms-center justify-between items-end">
                    <p className="text-primary text-xl font-semibold font-montserrat w-max"> ₹ {p.price} <span className="text-black font-mediums text-lg line-through">{p.original_price}</span>
                    </p>
                    <p className="font-semibold text-green-500">
                        {getDiscountedPricePercentage(p.original_price, p.price)}%  Off
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PopularProductCard;