import mongoose from "mongoose";
let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
 role: { type: Number, default: 0 },
    resetToken: { type: Number, required: true },
  },
  { timestamps: true }
);

let userModel = mongoose.model("users", userSchema);
export default userModel;
