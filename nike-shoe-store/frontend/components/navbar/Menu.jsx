import React from 'react';
import { navLinks, subMenuData } from '@/constants';
import { BsChevronDown } from "react-icons/bs";
import Link from 'next/link';

const Menu = ({ showCategoryMenu, setShowCategoryMenu, categories }) => {
    return (
        <ul className='flex justify-end items-center gap-10 xl:gap-16 max-lg:hidden'>
            {navLinks.map((item, index) => (
                <React.Fragment key={index}>
                    {item?.subMenu ? (
                        <li
                            className='relative p-2 hover:cta-hover font-montserrat leading-normal cursor-pointer text-slate-gray flex gap-3 items-center rounded'
                            onMouseEnter={() => setShowCategoryMenu(!showCategoryMenu)}
                            onMouseLeave={() => setShowCategoryMenu(!showCategoryMenu)}
                        >
                            {item.label}

                            <BsChevronDown className={`transition-all duration-200 ${showCategoryMenu ? 'rotate-180' : ''}`} />

                            {
                                showCategoryMenu && (
                                    <ul className='bg-white absolute top-[40px] border-[10px] border-transparent -left-4 p-2 shadow-lg w-max flex flex-col gap-1 rounded'>
                                        {
                                            categories?.map(({ attributes: c, id }) => (
                                                <li key={id} className='hover:cta-hover transition-all duration-200 p-2 rounded'>
                                                    <Link
                                                        href={`/category/${c?.slug}`}
                                                        className='gap-5 flex items-center justify-between w-full font-montserrat leading-normal text-slate-gray'
                                                        onClick={() => setShowCategoryMenu(!showCategoryMenu)}
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
                        <li className='p-2 hover:cta-hover rounded'>
                            <Link href={item?.href} className='whitespace-nowrap font-montserrat leading-normal text-slate-gray'>
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

export default Menu