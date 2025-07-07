import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import authRoutes from "./routes/authRoutes.js";
// TODO: Add productRoutes, orderRoutes, etc.

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
// app.use('/api/auth', authRoutes);
// TODO: Add more routes here

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;