import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    
    image: { 
      type: String, 
      required: true,
      
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: "pending",
    },
   
    
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);