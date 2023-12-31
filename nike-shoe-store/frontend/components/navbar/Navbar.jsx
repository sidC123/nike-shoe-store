"use client";
import Image from 'next/image';
import { headerLogo } from '@/assets/images';
import { useEffect, useState } from 'react';
import Menu from './Menu';
import Wrapper from '@/components/wrapper/Wrapper';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { BsCart } from 'react-icons/bs'
import { BiMenuAltRight } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'
import MobileMenu from './MobileMenu';
import Link from 'next/link';
import { fetchDataFromApi } from '@/utils/api';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [categories, setCategories] = useState(null)
    const cartItems = useSelector((state) => state.cart.cartItems)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 200) {
                if (currentScrollY > lastScrollY) {
                    setShow("-translate-y-[70px]");
                } else {
                    setShow("translate-y-0");
                }
            } else {
                setShow("translate-y-0");
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const fetchCategories = async () => {
        const { data } = await fetchDataFromApi(`/api/categories?populate=*`);
        setCategories(data);
    }

    useEffect(() => {
        fetchCategories();
    }, [])


    return (
        <header
            className={`flex items-center h-[70px] sticky top-0 z-50 w-full bg-white shadow-xl transition-transform duration-300 ${show}`}
        >
            <Wrapper className='flex justify-between items-center'>
                <Link href="/#home">
                    <Image src={headerLogo} alt="headerlogo" className='min-w-[100px] md:min-w-[130px]' height={29} />
                </Link>

                <Menu
                    setShowCategoryMenu={setShowCategoryMenu}
                    showCategoryMenu={showCategoryMenu}
                    categories={categories}
                />

                {
                    mobileMenu && (
                        <MobileMenu
                            setShowCategoryMenu={setShowCategoryMenu}
                            showCategoryMenu={showCategoryMenu}
                            setMobileMenu={setMobileMenu}
                            mobileMenu={mobileMenu}
                            categories={categories}
                        />
                    )
                }

                <div className='flex gap-2 items-center'>
                    <span>Sign In</span>
                    <div className='flex gap-1 items-center justify-center relative hover:cta-hover cursor-pointer p-3 rounded-full'>
                        <IoMdHeartEmpty className='text-[20px] md:text-[24px]' />
                        <div className='absolute flex justify-center items-center top-[5px] left-[26px] text-center p-1 aspect-square min-h-[16px] rounded-3xl bg-primary text-white font-semibold text-sm'>
                            <span>5</span>
                        </div>
                    </div>

                    <Link href="/cart" className='flex gap-1 items-center justify-center relative hover:cta-hover cursor-pointer p-3 rounded-full'>
                        <BsCart className='text-[18px] md:text-[22px]' />
                        <div className='absolute flex justify-center items-center top-[4px] left-[26px] text-center p-1 aspect-square min-h-[16px] rounded-3xl bg-primary text-white font-semibold text-sm'>
                            <span>{cartItems.length}</span>
                        </div>
                    </Link>

                    <div className='lg:hidden flex gap-1 items-center justify-center relative hover:cta-hover cursor-pointer p-3 rounded-full'>
                        {
                            mobileMenu ? (
                                <VscChromeClose
                                    className="text-[20px] md:text-[24px]"
                                    onClick={() => setMobileMenu(!mobileMenu)}
                                />
                            ) : (
                                <BiMenuAltRight
                                    className="text-[20px] md:text-[24px]"
                                    onClick={() => setMobileMenu(!mobileMenu)}
                                />
                            )
                        }
                    </div>
                </div>
            </Wrapper>
        </header >
    )
}

export default Navbar