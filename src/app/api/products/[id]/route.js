import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/dbConnect'; // Adjust the path as necessary
import Product from '../../../../models/Product'; // Adjust the path as necessary
import multer from 'multer';
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';

// Set up multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Directory to save uploaded files
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
  }),
});

// Create a Next.js API route handler
const handler = nextConnect();

// Use multer middleware for handling file uploads
handler.use(upload.single('image')); // Expecting a single file with the field name 'image'

handler.put(async (req, res) => {
  await dbConnect(); // Connect to the database

  const { id } = req.query; // Get the product ID from the query parameters
  const { name, description, price } = req.body; // Get other form data
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Get the image path if uploaded

  // Validate input
  if (!name && !description && !price && !image) {
    return NextResponse.json({ error: 'At least one field is required to update' }, { status: 400 });
  }

  try {
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update product details
    product.name = name || product.name; // Update name if provided
    product.description = description || product.description; // Update description if provided
    product.price = price || product.price; // Update price if provided
    if (image) {
      product.image = image; // Update image if a new one is uploaded
    }

    // Save the updated product to the database
    await product.save();

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
});

export const PUT = handler; // Export the handler for PUT requests