import dbConnect from "@/lib/Database";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
    
    
    await dbConnect();
    
    
    try {
        const products = await Product.find({});
        
        if (products.length === 0) {
            return NextResponse.json(
                { message: "No products found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            products,
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching products:", error); 
        return NextResponse.json(
            { message: "Error fetching products" },
            { status: 500 }
        );
    }
}
