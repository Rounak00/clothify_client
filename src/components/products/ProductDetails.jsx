import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const productFetchId = productId || id;
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [productFetchId, dispatch]);
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct?.images[0].url);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and colour before adding to cart");
    }else{
      setIsButtonDisabled(true);
      dispatch(
        addToCart({
          productId: productFetchId,
          size: selectedSize,
          color: selectedColor,
          quantity,
          userId: user?._id,
          guestId,
        })
      ).then(()=>{
         toast.success("Product added to cart successfully");
         
      }).finally(()=>{
         setIsButtonDisabled(false);
      });
    }
    
  };

  const handleQuantityChange = (action) => {
    if (action === "minus" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
  };
  
  if(loading){
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  if(error){
    return <p className="text-center text-red-500">{error}</p>;
  }
  return (
    <div className="p-6">
      {selectedProduct && (
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                  ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          <div className="md:w-1/2">
            <div className="mb-4 h-full">
              <img
                src={mainImage}
                alt="Main Thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          {/* For Mobile  */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.price &&
                `₹ ${selectedProduct.price}`}
            </p>
            <p className="text-xl text-gray-700 mb-2">
            ₹ {selectedProduct.discountPrice}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color: </p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-full border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.7)",
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Sizes: </p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-4 rounded text-white text-lg bg-black cursor-pointer hover:bg-gray-800"
                >
                  -
                </button>
                <span className=" text-center w-[5%]">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-4 rounded text-white text-lg bg-black cursor-pointer hover:bg-gray-800"
                >
                  +
                </button>
              </div>
            </div>
            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-800"
              }`}
            >
              {isButtonDisabled ? "Adding ..." : "Add to cart"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4"> Characteristics</h3>
              <table className="w-full text-sm text-left text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid product={similarProducts} />
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductDetails;
