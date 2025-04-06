import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { editProductSchema } from "../../validators";
import { ZodError } from "zod";

const EditPtoduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [removeImageLoader, setRemoveImageLoader] = useState(false);
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
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
      toast.error("Error in update product");
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
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload/cloudinary-delete`,
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
    try{ 
    e.preventDefault();
    const validatedData = editProductSchema.parse(productData);
    await dispatch(updateProduct({ id, validatedData }));
    navigate("/admin/products");
    }
    catch(err){
      if (err instanceof ZodError) {
        toast.error(err.errors[0].message);
      }else {
        toast.error("Error in product update");
      }

    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading ...</p>;
  if (error) return <p className="text-center text-red-500">Error : {error}</p>;
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
            value={productData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md border-gray-300"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2"> Description</label>
          <textarea
            name="description"
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
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-seperated)
          </label>
          <input
            type="text"
            name="sizes"
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
          {removeImageLoader && <p className="text-red-500">Removing Image from Cloudinary ...</p>}

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

export default EditPtoduct;
