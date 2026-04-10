import express from "express";
// import { Lab } from "../models/Lab";

const router = express.Router();

// Mock Data
const MOCK_LABS = [
  {
    id: "l1",
    name: "Apollo Diagnostics",
    rating: 4.8,
    reviews: 1240,
    distance: "2.5 km",
    address: "Andheri East, Mumbai",
    price: 399,
    features: ["NABL Accredited", "Home Collection", "E-Reports"]
  },
  {
    id: "l2",
    name: "Metropolis Healthcare",
    rating: 4.6,
    reviews: 850,
    distance: "3.1 km",
    address: "Powai, Mumbai",
    price: 450,
    features: ["NABL Accredited", "Home Collection"]
  }
];

router.get("/", async (req, res) => {
  try {
    // Mock implementation
    res.json(MOCK_LABS);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Mock implementation
    const lab = MOCK_LABS.find(l => l.id === req.params.id);
    if (!lab) return res.status(404).json({ message: "Lab not found" });
    res.json(lab);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
