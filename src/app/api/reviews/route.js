import dbConnect from '@/lib/Database';
import { NextResponse } from 'next/server';
import Review from '@/models/Review.model';


export async function POST(req) {
  

  await dbConnect(); 

  

  const { productId, name, description, price, image, status,userId } = await req.json();
 console.log(userId);
 
  // Validate input
  if (!productId || !name || !description || !price || !image || !status || !userId) {
    return NextResponse.json({ message: "All fields must be provided" }, { status: 400 });
  }

  try {
    const newReview = new Review({
      productId,
      userId, 
      name,
      description,
      price,
      image,
      status,
    });

    await newReview.save();
    console.log(newReview);

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
