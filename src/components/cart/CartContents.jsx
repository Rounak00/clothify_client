import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContents = () => {
    const cartProduct = [
        {
            productId: 1,
            name: "T-Shirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 15,
            image: "https://picsum.photos/200?random=1",
        }, {
            productId: 2,
            name: "Jeans",
            size: "XL",
            color: "Green",
            quantity: 1,
            price: 15,
            image: "https://picsum.photos/200?random=1",
        }, {
            productId: 3,
            name: "T-Shirt 2",
            size: "L",
            color: "Blue",
            quantity: 1,
            price: 15,
            image: "https://picsum.photos/200?random=1",
        }
    ]
    return (
        <div>
            {
                cartProduct.map((product, index) => (
                    <div className="flex items-start justify-between py-4 border-b" key={index}>
                        <div className='flex items-start'>
                            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                            <div>
                                <h3>{product.name}</h3>
                                <p className='text-sm text-gray-500'>size: {product.size} | color: {product.color} </p>
                                <div className='flex items-center mt-2'>
                                    <button className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                                    <span className='mx-4'>{product.quantity}</span>
                                    <button className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>₹ {product.price.toLocaleString()}</p>
                            <button className='text-[#ba260c]'><RiDeleteBin3Line className='h-6 w-6 mt-2'/></button>    
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CartContents