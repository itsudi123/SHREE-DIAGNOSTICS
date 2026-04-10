import mongoose from "mongoose";

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  features: [{ type: String }],
  about: { type: String },
  timings: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Lab = mongoose.models.Lab || mongoose.model("Lab", labSchema);
