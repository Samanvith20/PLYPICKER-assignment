import dbConnect from "@/lib/Database";
import Product from '@/models/product.model';
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/Cloudinary";

export async function PUT(req) {
  try {
    // Extract the ID from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    // Parse the form data
    const formData = await req.formData();
    
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const file = formData.get("image");

    // Validate fields
    if (!name && !description && !price && !file) {
      return NextResponse.json({ message: "At least one field must be provided for update" }, { status: 400 });
    }

    await dbConnect();

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // If an image is provided, upload it to Cloudinary
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const result = await uploadToCloudinary(buffer);
      
      if (!result.url) {
        return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
      }

      // Update the product's image URL
      product.imageUrl = result.secure_url;
    }

    // Update the other fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    // Save the updated product to the database
    await product.save();

    return NextResponse.json({ message: "Product updated successfully", product }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}