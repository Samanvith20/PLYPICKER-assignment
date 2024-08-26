import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { 
    type: String,
     required: true,
      unique: true
    },
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ["admin", "team member"], 
    required: true },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
