import Image from "next/image"
import { star } from "@/assets/icons"

const TestimonialCard = ({ imgURL, customerName, rating, feedback }) => {
    return (
        <div className="flex justify-center items-center flex-col">
            <Image src={imgURL} alt={customerName} className="rounded-full object-cover w-[120px] h-[120px]" />
            <p className="max-w-sm mt-6 text-center infp-text">{feedback}</p>
            <div className="mt-3 flex justify-center items-center gap-2.5">
                <Image src={star} alt="star" width={24} height={24} />
                <p className="text-xl font-montserrat text-slate-gray">{rating}</p>
            </div>

            <h3 className="mt-1 font-Jost font-bold text-3xl text-center">{customerName}</h3>
        </div>
    )
}

export default TestimonialCard