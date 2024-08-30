import dbConnect from "@/lib/Database";
import { NextResponse } from "next/server";
import Product from '@/models/product.model';
import { uploadToCloudinary } from "@/lib/Cloudinary";

export async function POST(req) {
  try {
    // Parse the form data
    const formData = await req.formData();
    
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const file = formData.get("image"); 

    // Validate fields
    if (!name || !description || !price || !file) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload image to Cloudinary using the buffer
    const result = await uploadToCloudinary(buffer);
   
    console.log("Uploaded to Cloudinary successfully", result);
   
    if (!result.url) {
      return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
    }

    await dbConnect();

    // Create product in the database
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl: result.secure_url,
    });

    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (error) {
    console.log("Server error", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}


