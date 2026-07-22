import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import "./server";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ServiGo API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ServiGo API running on http://localhost:${PORT}`);
});