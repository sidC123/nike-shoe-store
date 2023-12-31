import Image from "next/image";
import { arrowRight } from "@/assets/icons";
import { offer } from "@/assets/images";
import Button from "@/components/button/Button";

const SpecialOffer = () => {
    return (
        <section className="flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container">

            <div className="flex-1">
                <Image src={offer} width={773} height={687} className="object-contain w-full" alt="" />
            </div>

            <div className="flex flex-col flex-1 ">
                <h2 className="font-Jost text-4xl capitalize font-bold lg:max-w-lg">
                    <span className="text-primary">Special</span> Offers
                </h2>

                <p className="mt-4 sm:max-w-lg info-text">Unlock Extraordinary Savings: Dive into our Special Offers section and seize the chance to grab your favorite Nike products at unbeatable prices.
                </p>

                <p className="mt-4 sm:max-w-lg info-text"> Browse through premium athletic gear, fashion-forward apparel, and must-have accessories, all designed to empower you while keeping your savings intact. </p>

                <div className="mt-11 flex flex-wrap gap-4 items-center">
                    <Button
                        label="Shop Now"
                        iconURL={arrowRight}
                    />
                    <Button
                        label="Learn More"
                        backgroundColor="bg-white"
                        borderColor="border-slate-gray"
                        textColor="text-slate-gray"
                    />
                </div>
            </div>
        </section>
    )
}

export default SpecialOffer