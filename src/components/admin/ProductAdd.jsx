import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductSlice";
import { useNavigate } from "react-router-dom";
import { addProductSchema } from "../../validators";
import { ZodError } from "zod";
import axiosInstance from "../../service/axiosInstance";
const ProductAdd = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    discountPrice: 0,
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    reviews: 0,
    rating: 0,
    material: "",
    gender: "",
    isFeatured: false,
    isPublished: false,
    weight: 0.0,
    images: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [removeImageLoader, setRemoveImageLoader] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axiosInstance.post(
        `/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.data, altText: "" }],
      }));
      setUploading(false);
    } catch (err) {
      setUploading(false);
      toast.error("Error in adding product")
    }
  };
  const handleImageRemove = async (imageUrl) => {
    try {
      setRemoveImageLoader(true);
      if (!imageUrl) {
        toast.error("Image url is not provided");
      } else {
        setProductData((prevData) => ({
          ...prevData,
          images: prevData.images.filter((i) => i.url !== imageUrl),
        }));
        await axiosInstance.delete(
          `/api/upload/cloudinary-delete`,
          {
            data: { imageUrl },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
      }
    } catch (err) {
      toast.error("Error in image delete");
    } finally {
      setRemoveImageLoader(false);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validatedData = addProductSchema.parse(productData);
    await dispatch(createProduct(validatedData));
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      if (err instanceof ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error("Error in product add");
      }
  }};
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Product name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md border-gray-300"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2"> Description</label>
          <textarea
            name="description"
            placeholder="Product description"
            value={productData.description}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            placeholder="Product price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Discounted price</label>
          <input
            type="number"
            placeholder="Product discounted price"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Brand</label>
          <input
            type="text"
            placeholder="Product brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gender</label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisexual</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Category</option>
            <option value="Top Wear">Top Wear</option>
            <option value="Bottom Wear">Bottom Wear</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Material</label>
          <input
            type="text"
            placeholder="Product material"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Collections of</label>
          <input
            type="text"
            placeholder="Product collection"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">No. of reviews</label>
          <input
            type="number"
            placeholder="Number of reviews"
            name="reviews"
            value={productData.reviews}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Ratings</label>
          <input
            type="number"
            placeholder="Product ratings"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            placeholder="Product quantity in stock"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product weight (in Gm.)
          </label>
          <input
            type="number"
            placeholder="Product weight"
            name="weight"
            value={productData.weight}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            placeholder="Product unique code"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Is Featured?</label>
          <select
            name="isFeatured"
            value={productData.isFeatured}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                isFeatured: e.target.value === "true",
              }))
            }
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Is Published?</label>
          <select
            name="isPublished"
            value={productData.isPublished}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                isPublished: e.target.value === "true",
              }))
            }
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-seperated)
          </label>
          <input
            type="text"
            name="sizes"
            placeholder="Sizes in capital"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-seperated)
          </label>
          <input
            type="text"
            name="colors"
            placeholder="colors in capital first letter"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-red-500">Uploading Image ...</p>}
          {removeImageLoader && (
            <p className="text-red-500">Removing Image from Cloudinary ...</p>
          )}

          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, ind) => (
              <div key={ind} className="relative w-20 h-20">
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(image.url)}
                  className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
