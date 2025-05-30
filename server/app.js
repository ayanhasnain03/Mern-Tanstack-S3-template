import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors({
  origin:process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
