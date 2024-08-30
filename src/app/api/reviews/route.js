import dbConnect from '@/lib/Database';
import { NextResponse } from 'next/server';
import Review from '@/models/Review.model';

export async function POST(req) {
  await dbConnect(); 

  const { productId, name, description, price, image, status } = await req.json();

  try {
    const newReview = new Review({
      productId,
      name,
      description,
      price,
      image,
      status,
    });
    
    if(!productId && !name && !description && !price && !image && !status) {
        return NextResponse.json({ message: "At least one field must be provided for update" }, { status: 400 });
    }

    await newReview.save();

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}