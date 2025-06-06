import React from 'react';
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaturedSection = () => {
    return (
        <section className='py-16 px-4 bg-white'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center
        '>

                <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full mb-4">
                        <HiShoppingBag className='text-3xl' />
                    </div>
                    <h4 className='tracking-tighter mb-2'>
                        FREE INTERNATIONAL SHIPPING
                    </h4>
                    <p className='text-gray-600 '>
                        On all orders over ₹ 1000/-
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full mb-4">
                        <HiArrowPathRoundedSquare className='text-3xl' />
                    </div>
                    <h4 className='tracking-tighter mb-2'>
                       45 DAYS RETURN
                    </h4>
                    <p className='text-gray-600 '>
                        Money back guarantee
                    </p>
                </div>


                <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full mb-4">
                        <HiOutlineCreditCard className='text-3xl' />
                    </div>
                    <h4 className='tracking-tighter mb-2'>
                        SECURE CHECKOUT
                    </h4>
                    <p className='text-gray-600 '>
                        100% secured checkout process 
                    </p>
                </div>
            </div>

        </section>
    )
}

export default FeaturedSection