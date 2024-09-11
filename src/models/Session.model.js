import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ipAddress: {
    type: String,
  },
  loginTime: { type: Date, required: true },
  logoutTime: { type: Date },
  activities: [
    {
      action: { type: String },
      description: { type: String },
      details: {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productName: { type: String },
        productPrice: { type: Number },
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
 
});

const Sessions = mongoose.models.Sessions || mongoose.model('Sessions', SessionSchema);
export default Sessions;
