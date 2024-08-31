import dbConnect from "@/lib/Database";
import Product from '@/models/product.model';

import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    // Extract the ID from the request URL
    
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    console.log(id);
    

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the product by ID and delete it
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
