import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilters = createAsyncThunk(
  "product/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    sortBy,
    minPrice,
    maxPrice,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (sortBy) query.append("sortBy", sortBy);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product?${query}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }) => {
    
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    
    return response.data;
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "product/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/similar/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      collection: "",
      size: "",
      color: "",
      gender: "",
      sortBy: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      material: "",
      brand: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        collection: "",
        size: "",
        color: "",
        gender: "",
        sortBy: "",
        minPrice: "",
        maxPrice: "",
        search: "",
        material: "",
        brand: "",
      };
    },

  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(fetchProductsByFilters.fulfilled, (state,action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload.data) ? action.payload.data : [];
        state.error = null;
       })
       .addCase(fetchProductsByFilters.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
       })
       .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(fetchProductDetails.fulfilled, (state,action) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
        state.error = null;
       })
       .addCase(fetchProductDetails.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
       })
       .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(updateProduct.fulfilled, (state,action) => {
        state.loading = false;
        const updatedProduct = action.payload.data;
        const index = state.products.findIndex(product => product._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.error = null;
       })
       .addCase(updateProduct.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
       })
       .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(fetchSimilarProducts.fulfilled, (state,action) => {
        state.loading = false;
        state.similarProducts = action.payload.data;
        state.error = null;
       })
       .addCase(fetchSimilarProducts.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
       })
  }
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
