import React from 'react';
import { navLinks, subMenuData } from '@/constants';
import { BsChevronDown } from "react-icons/bs";
import Link from 'next/link';

const MobileMenu = ({ showCategoryMenu, setShowCategoryMenu, setMobileMenu, mobileMenu, categories }) => {
    return (
        <ul className='flex flex-col px-3 py-2 absolute top-[70px] z-40 left-0 h-[100vh] max-w-[420px] w-full lg:hidden bg-white shadow-lg'>
            {navLinks.map((item, index) => (
                <React.Fragment key={index}>
                    {item?.subMenu ? (
                        <li
                            className='relative px-2 py-3 hover:cta-hover font-montserrat leading-normal text-xl cursor-pointer text-slate-gray flex flex-col gap-3 items-center border-b'
                            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                        >
                            <div className='flex items-center justify-between w-full'>
                                {item.label}
                                <BsChevronDown className={`transition-all duration-200 ${showCategoryMenu ? 'rotate-180' : ''}`} />
                            </div>

                            {
                                showCategoryMenu && (
                                    <ul className='bg-ternary px-4 py-3 w-full flex flex-col gap-1'>
                                        {
                                            categories?.map(({ attributes: c, id }) => (
                                                <li key={id} className='hover:cta-hover transition-all duration-200 p-2 rounded'>
                                                    <Link
                                                        href={`/category/${c?.slug}`}
                                                        className='gap-5 flex items-center justify-between w-full font-montserrat leading-normal text-lg text-slate-gray'
                                                        onClick={() => {
                                                            setShowCategoryMenu(!showCategoryMenu)
                                                            setMobileMenu(!mobileMenu)
                                                        }}
                                                    >
                                                        <span>{c?.name}</span>
                                                        <span className='opacity-75 rounded-2xl text-sm flex items-center px-2 leading-6 bg-gray-400 text-white'>{c?.products?.data?.length}</span>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </li>
                    ) : (
                        <li className='px-2 py-3 border-b hover:cta-hover'>
                            <Link
                                href={item?.href}
                                className='font-montserrat leading-normal text-xl text-slate-gray'
                                onClick={() => setMobileMenu(!mobileMenu)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    )}
                </React.Fragment>
            ))
            }
        </ul>
    )
}

export default MobileMenu