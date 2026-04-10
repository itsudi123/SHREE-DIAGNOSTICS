import express from "express";
// import { Test } from "../models/Test";

const router = express.Router();

// Mock Data
const MOCK_TESTS = [
  {
    id: "t1",
    type: "test",
    name: "Complete Blood Count (CBC)",
    description: "Measures different components of blood to evaluate overall health.",
    price: 399,
    originalPrice: 500,
    labsCount: 12,
    fastingRequired: false,
    reportTime: "24 Hrs"
  },
  {
    id: "p1",
    type: "package",
    name: "Comprehensive Full Body Checkup",
    description: "Includes 85 tests covering vital organs and health parameters.",
    price: 2499,
    originalPrice: 4999,
    labsCount: 5,
    fastingRequired: true,
    reportTime: "48 Hrs"
  }
];

router.get("/", async (req, res) => {
  try {
    const { q, type } = req.query;
    let results = [...MOCK_TESTS];
    
    if (q) {
      const queryStr = String(q).toLowerCase();
      results = results.filter(t => t.name.toLowerCase().includes(queryStr) || t.description.toLowerCase().includes(queryStr));
    }
    
    if (type && type !== "all") {
      const typeStr = String(type).replace('s', '');
      results = results.filter(t => t.type === typeStr);
    }
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const test = MOCK_TESTS.find(t => t.id === req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
