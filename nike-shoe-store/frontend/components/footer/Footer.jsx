import { copyrightSign } from "@/assets/icons";
import { footerLogo } from "@/assets/images";
import { footerLinks, socialMedia } from "@/constants";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-black padding-x padding-t pb-8 ">
            <div className="max-container">
                <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
                    <div className="flex flex-col items-start">
                        <a href="/" >
                            <Image src={footerLogo} alt="footer logo" width={150} />
                        </a>
                        <p className="text-base leading-7 font-montserrat text-white-400 mt-6 sm:max-w-sm">Get shoes ready for the new term at your nearest Nike store. Find Your perfect Size In Store. Get Rewards</p>
                        <div className="flex gap-5 mt-8 items-center">
                            {socialMedia.map((icon, index) => (
                                <div key={index} className="flex justify-center items-center w-12 h-12 bg-white rounded-full">
                                    <Image src={icon.src} alt={icon.alt} width={24} height={24} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h4 className="text-white font-montserrat text-2xl leading-normal font-medium mb-6">{section.title}</h4>
                                <ul>
                                    {section.links.map((link, index) => (
                                        <li className="mt-2 text-white-400 font-montserrat leading-normal text-base hover:text-slate-gray cursor-pointer" key={index}>
                                            <a>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
                    <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
                        <Image src={copyrightSign} alt="copyright sign" width={20} height={20} className="rounded-full m-0" />
                        <p>Copyright. All rights reserved.</p>
                    </div>
                    <p className="font-montserrat cursor-pointer">Terms and Conditions</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer