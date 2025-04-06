import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../../redux/slices/cartSlice";
import { removeFromCart } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          userId,
          guestId,
          productId,
          quantity: newQuantity,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ userId, guestId, productId, size, color }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          className="flex items-start justify-between py-4 border-b"
          key={index}
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}{" "}
              </p>
              <div className="flex items-center mt-2">
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium"
                onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }>
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>₹ {product.price.toLocaleString()}</p>
            <button className="text-[#ba260c]" onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}>
              <RiDeleteBin3Line className="h-6 w-6 mt-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
