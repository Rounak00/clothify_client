import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton';

const cart = {
    products: [
        {
            name: "Jacket",
            size: "M",
            color: "Black",
            price: 1200,
            image: "https://picsum.photos/150?random=1"
        }, {
            name: "Casual Sneakers",
            size: "XL",
            color: "White",
            price: 750,
            image: "https://picsum.photos/150?random=2"
        }
    ],
    totalPrice: 1950,
}

const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId]=useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    });
    const handleCreateCheckout=(e)=>{
        e.preventDefault();
        setCheckoutId(123);
    }
    const handlePaymentSuccess=(details)=>{
      navigate("/order-confirmation")
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            <div className='p-6 bg-white rounded-lg'>
                <h2 className="text-2xl uppercase mb-6">
                    Checkout
                </h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className='text-lg'>Contact Details</h3>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" value="example" disabled className='w-full p-2 border rounded' />
                    </div>
                    <h3 className='text-lg mb-4'>Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className='block text-gray-700'> First Name</label>
                            <input type="text" value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} className='w-full p-2 border rounded' required />
                        </div>
                        <div>
                            <label className='block text-gray-700'> Last Name</label>
                            <input type="text" value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} className='w-full p-2 border rounded' required />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700">Address</label>
                        <input type="text" value={shippingAddress.address} className='w-full p-2 border rounded' required onChange={(e)=>setShippingAddress({...shippingAddress,address:e.target.value})} />
                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'> City</label>
                            <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className='w-full p-2 border rounded' required />
                        </div>
                        <div>
                            <label className='block text-gray-700'> Postal Code</label>
                            <input type="text" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} className='w-full p-2 border rounded' required />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700">Country</label>
                        <input type="text" value={shippingAddress.country} className='w-full p-2 border rounded' required onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700">Phone</label>
                        <input type="tel" value={shippingAddress.phone} className='w-full p-2 border rounded' required onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} />
                    </div>
                    <div className="mt-6">
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>
                                Continue to Payment
                            </button>
                        ):(<div>
                            <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                            <PaypalButton amount={1020} onSuccess={handlePaymentSuccess} onError={(err)=>alert("Payment failed, Try again.")}/>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className='text-lg mb-4'>Order Summary</h3>
                <div className='border-t py-4 mb-4'>
                    {cart.products.map((product,ind)=>( 
                        <div key={ind} className="flex items-start border-b py-2 justify-between">
                          <div className='flex items-start '>
                            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4'/>
                            <div>
                                <h3 className="text-md">{product.name}</h3>
                                <p className='text-gray-500'>Size: {product.size}</p>
                                <p className='text-gray-500'>Colour: {product.color}</p>
                            </div>
                          </div>
                            <p className="text-xl">₹ {product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>₹{cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p>Free</p>
                    <p>Shipping</p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p>Total</p>
                    <p>₹{cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout