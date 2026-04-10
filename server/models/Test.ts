import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ["test", "package"], required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  fastingRequired: { type: Boolean, default: false },
  reportTime: { type: String },
  parameters: [{ type: String }], // For packages
  availableLabs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lab" }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Test = mongoose.models.Test || mongoose.model("Test", testSchema);
