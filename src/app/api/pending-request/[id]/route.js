import dbConnect from "@/lib/Database";
import Review from "@/models/Review.model";
import { NextResponse } from "next/server";

// GET request to fetch a specific pending review by ID
export async function GET(req, { params }) {
  await dbConnect();
  
  try {
    const review = await Review.findById(params.id);
    if (!review || review.status !== "pending") {
      return NextResponse.json({ message: "Review not found or not pending" }, { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PATCH request to update a specific review's status (approve/reject)
export async function PATCH(req, { params }) {
  const { status } = await req.json();
  console.log(status);
  
  await dbConnect();
  
  try {
    const review = await Review.findById(params.id);
    if (!review || review.status !== "pending") {
      return NextResponse.json({ message: "Review not found or not pending" }, { status: 404 });
    }

    review.status = status;
    await review.save();

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
