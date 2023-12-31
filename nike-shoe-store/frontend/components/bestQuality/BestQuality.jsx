import Image from "next/image";
import { shoe8 } from "@/assets/images/";
import Button from "@/components/button/Button";

const BestQuality = () => {
    return (
        <section id="about-us" className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container">
            <div className="flex flex-col flex-1 ">
                <h2 className="font-Jost text-4xl capitalize font-bold lg:max-w-lg">
                    We deliver only <span className="text-primary">Best quality</span> Shoes
                </h2>

                <p className="mt-4 sm:max-w-lg info-text">Discover Unrivaled Comfort and Durability: Our Best Quality Shoes Collection. Engineered for Performance and Style, Elevate Every Step with Premium Craftsmanship.
                </p>

                <p className="mt-4 sm:max-w-lg info-text">Experience the Perfect Blend of Innovation and Elegance, Redefining Footwear Excellence.</p>

                <div className="mt-11">
                    <Button label="View Details" />
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <Image src={shoe8} className="object-contain w-full" alt="super quality image" />
            </div>
        </section>
    )
}

export default BestQuality