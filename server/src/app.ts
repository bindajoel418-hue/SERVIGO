import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import authMiddleware from "./common/middleware/authMiddleware";
import authRoutes from "./modules/auth/auth.routes";
import { AppError } from "./common/errors/AppError.js";
import { errorHandler } from "./common/middleware/errorHandler.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));

// Health Route
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ServiGo API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Test Global Error Handler
app.get("/api/v1/error", (_req, _res, next) => {
  next(new AppError(400, "Testing global error handler"));
});

// Test protected route
app.get(
  "/api/v1/protected",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Protected route accessed",
    });
  }
);

app.use("/api/v1/auth", authRoutes);
// Error handler MUST be last
app.use(errorHandler);

export default app;