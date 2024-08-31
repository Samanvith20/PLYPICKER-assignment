import dbConnect from "@/lib/Database";
import Review from "@/models/Review.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const pendingReviews = await Review.find({ status: "pending" });
    if (pendingReviews.length === 0) {
      return NextResponse.json({ message: "No pending reviews found" }, { status: 404 });
    }
    return NextResponse.json(pendingReviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
