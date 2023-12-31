import Image from 'next/image';
import Link from 'next/link';
import Wrapper from '@/components/wrapper/Wrapper';
import CartItem from '@/components/cartItem/CartItem';
import { emptyCartImage } from '@/assets/images';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { makePaymentRequest } from "@/utils/api";

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    // console.log(cartItems);

    const subTotal = useMemo(() => {
        return cartItems.reduce((total, val) => total + val.attributes.price, 0)
    }, [cartItems])

    const handlePayment = async () => {
        try {
            setLoading(true);
            const stripe = await stripePromise;
            const res = await makePaymentRequest("/api/orders", {
                products: cartItems,
            });
            await stripe.redirectToCheckout({
                sessionId: res.stripeSession.id,
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <Wrapper className="py-5">
            {cartItems.length > 0 ? (
                <>
                    <h1 className='text-black font-semibold text-3xl mb-4'>Shopping Cart</h1>

                    {/* CART CONTENTS */}
                    <div className='flex flex-col gap-8 lg:gap-16 md:flex-row relative'>
                        {/* CART ITEMS */}
                        <div className='md:w-2/3'>
                            <h2 className='text-lg font-semibold mb-2'>Cart Items</h2>
                            {
                                cartItems && cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        data={item}
                                    />
                                ))
                            }
                        </div>
                        {/* CART ITEMS  */}

                        {/* CART SUMMARY */}
                        <div className='md:w-1/3 sticky top-[95px] h-full'>
                            <div className="flex-[1]">
                                <h2 className='text-lg font-semibold mb-2'>Summary</h2>

                                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                                    <div className="flex justify-between">
                                        <div className="uppercase text-md md:text-lg font-medium text-black">
                                            Subtotal
                                        </div>
                                        <div className="text-md md:text-lg font-medium text-black">
                                            &#8377; {subTotal}
                                        </div>
                                    </div>
                                    <div className="text-sm md:text-md py-5 border-t mt-5">
                                        The subtotal reflects the total price of
                                        your order, including duties and taxes,
                                        before any applicable discounts. It does
                                        not include delivery costs and
                                        international transaction fees.
                                    </div>
                                </div>

                                {/* BUTTON START */}
                                <button
                                    className="w-full py-4 rounded-full bg-primary text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                                    onClick={handlePayment}
                                >
                                    Checkout
                                    {loading && <img src="/spinner.svg" />}
                                </button>
                                {/* BUTTON END */}
                            </div>
                            {/* SUMMARY END */}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-[2] flex flex-col items-center pb-[50px]">
                    <Image
                        src={emptyCartImage}
                        width={300}
                        height={300}
                        className="w-[300px] md:w-[400px]"
                    />
                    <span className="text-xl font-bold">
                        Your cart is empty
                    </span>
                    <span className="text-center mt-4">
                        Looks like you have not added anything in your cart.
                        <br />
                        Go ahead and explore top categories.
                    </span>
                    <Link
                        href="/"
                        className="py-4 px-8 rounded-full bg-primary text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                    >
                        Continue Shopping
                    </Link>
                </div>
            )}
        </Wrapper>
    )
}

export default Cart