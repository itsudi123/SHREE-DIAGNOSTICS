import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
// import mongoose from "mongoose";

// Import API routes (to be created)
import authRoutes from "./server/routes/auth";
import labRoutes from "./server/routes/labs";
import testRoutes from "./server/routes/tests";
import bookingRoutes from "./server/routes/bookings";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Connect to MongoDB (Mocked for preview if no URI)
  /*
  if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("MongoDB connection error:", err));
  } else {
    console.log("No MONGODB_URI provided. Running with mock data.");
  }
  */

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Shree Diagnostics API is running" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/labs", labRoutes);
  app.use("/api/tests", testRoutes);
  app.use("/api/bookings", bookingRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
