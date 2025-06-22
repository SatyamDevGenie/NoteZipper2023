import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();
connectDB();

app.use(express.json()); // Request for json data

const corsOptions = {
  origin: "https://localhost:3000", // Replace with your Netlify URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies if needed
  optionsSuccessStatus: 204,
};

// Enable CORS
app.use(cors()); // Use the cors middleware

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Create a static folder - Ready for Deployment 
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// Middleware for handling the errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
