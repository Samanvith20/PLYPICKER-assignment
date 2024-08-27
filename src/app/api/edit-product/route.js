// pages/api/products/[id]/edit.js
import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export default async function PUT(req, res) {
  const { id } = req.query;
  await dbConnect();

 
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      const { name, description, price, imageUrl } = req.body;

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.imageUrl = imageUrl || product.imageUrl;
      product.status = 'pending'; 

      await product.save();

      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
    }
  
}

