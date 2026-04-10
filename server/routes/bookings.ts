import express from "express";
// import { Booking } from "../models/Booking";

const router = express.Router();

// Mock Data
let MOCK_BOOKINGS = [
  {
    id: "BKG-1029",
    testName: "Comprehensive Full Body Checkup",
    labName: "Apollo Diagnostics",
    date: "2023-10-25",
    time: "09:00 AM",
    status: "Completed",
    amount: 2499,
    reportAvailable: true
  }
];

// Middleware to check auth (mocked)
const requireAuth = (req: any, res: any, next: any) => {
  // In real app, verify JWT token from cookies/headers
  req.user = { id: "mock_user_id" };
  next();
};

router.post("/", requireAuth, async (req, res) => {
  try {
    const newBooking = {
      id: `BKG-${Math.floor(Math.random() * 10000)}`,
      ...req.body,
      status: "Pending",
      reportAvailable: false
    };
    MOCK_BOOKINGS.push(newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-bookings", requireAuth, async (req: any, res) => {
  try {
    // In real app, filter by req.user.id
    res.json(MOCK_BOOKINGS);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
