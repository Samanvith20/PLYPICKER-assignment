
import dbConnect from "@/lib/Database";
import Review from "@/models/Review.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    // Extract userId from query parameters or headers
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    // console.log(userId);
    
    
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const reviews = await Review.find({ userId: userId });
    console.log(reviews);
    
    if (!reviews || reviews.length === 0) {
      return NextResponse.json({ message: "No reviews found for this user" }, { status: 404 });
    }
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
