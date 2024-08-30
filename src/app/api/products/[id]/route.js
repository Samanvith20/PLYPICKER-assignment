import dbConnect from "@/lib/Database";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET(req){
  const Url= new URL(req.url);
  const id = Url.pathname.split('/').pop();
  console.log(id);
  
   await dbConnect()
  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: 'Error fetching product' }, { status: 500 });
  }
}