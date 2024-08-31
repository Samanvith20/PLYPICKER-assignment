import dbConnect from "@/lib/Database";
import Review from "@/models/Review.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const reviews = await Review.find({});
    if (!reviews || reviews.length === 0) {
      return NextResponse.json({ message: "No reviews found" }, { status: 404 });
    }
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
