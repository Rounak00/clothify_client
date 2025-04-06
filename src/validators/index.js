import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })



export const addProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    discountPrice: z.coerce.number().min(1, "Discount price must be 1 or more"),
    price: z.coerce.number().min(1, "Price must be 1 or more"),
    countInStock: z.coerce.number().min(1, "Stock count must be 1 or more"),
    sku: z.string().min(3, "SKU is required"),
    category: z.enum(["Top Wear", "Bottom Wear"], {
      errorMap: () => ({ message: "Category must be either Top Wear or Bottom Wear" }),
    }),
    brand: z.string().min(1, "Brand is required"),
    sizes: z.array(z.string()).min(1, "At least one size is required"),
    colors: z.array(z.string()).min(1, "At least one color is required"),
    collections: z.string().optional(),
    reviews: z.coerce.number().min(0, "Reviews cannot be negative"),
    rating: z.coerce.number().min(1).max(5, "Rating must be between 0 and 5"),
    material: z.string().optional(),
    gender: z.enum(["Men", "Women", "Unisex"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    isFeatured: z.boolean(),
    isPublished: z.boolean(),
    weight: z.coerce.number().min(1, "Weight must be 1 or more"),
    images: z
      .array(z.object({ url: z.string().url(), altText: z.string().optional() }))
      .min(1, "At least one image is required"),
  });

  export const editProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(10, "Description should be 10 letters long"),
    price: z.coerce.number().min(1, "Price must be 1 or more"),
    countInStock: z.coerce.number().min(1, "Stock must be 1 or more"),
    sku: z.string().min(3, "SKU is required"),
    category: z.string().optional(),
    brand: z.string().optional(),
    sizes: z.array(z.string()).min(1, "At least one size is required"),
    colors: z.array(z.string()).min(1, "At least one color is required"),
    collections: z.string().optional(),
    material: z.string().optional(),
    gender: z.string().optional(),
    images: z
      .array(z.object({ url: z.string().url(), altText: z.string().optional() }))
      .min(1, "At least one image is required"),
  });