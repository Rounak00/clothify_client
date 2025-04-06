import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  
  const navigate = useNavigate();
  const handleChekout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`z-50 fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              onClick={handleChekout}
            >
              Check out
            </button>
            <p className="text-sm tracking-tighter  text-center mt-2 text-gray-500">
              shipping, taxes and discout codes calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
