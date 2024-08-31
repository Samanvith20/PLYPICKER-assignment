import dbConnect from '@/lib/Database';
import { NextResponse } from 'next/server';
import Review from '@/models/Review.model';
import { uploadToCloudinary } from '@/lib/Cloudinary';

export async function POST(req) {
  await dbConnect(); 

  try {
    // Parse the form data
    const formData = await req.formData();
    
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const file = formData.get("image");
    const userId = formData.get("userId");
    const productId = formData.get("productId");

    // Validate input
    if (!productId || !name || !description || !price || !userId) {
      return NextResponse.json({ message: "All fields must be provided" }, { status: 400 });
    }

    // Initialize newReview object
    const reviewData = {
      productId,
      userId,
      name,
      description,
      price,
    };

    // If an image is provided, upload it to Cloudinary
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await uploadToCloudinary(buffer);

      if (!result.url) {
        return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
      }

      reviewData.image = result.secure_url;
    }

    // Create and save the review
    const newReview = new Review(reviewData);
    await newReview.save();

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
