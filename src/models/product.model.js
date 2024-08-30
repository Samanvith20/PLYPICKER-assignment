
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a product price'],
  },
  imageUrl: {
    type: String,
    required: true, 
  },
  
  
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
