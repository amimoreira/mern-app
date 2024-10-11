import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";
import cors from "cors";
import userRoutes from "./routes/usersRoutes";
import expRoutes from "./routes/expRoutes";
import contactRoutes from "./routes/contactRoutes";
import aboutRoutes from "./routes/aboutRoutes";

dotenv.config();
const port = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

const app = express();

// Configura la carpeta 'uploads' como una ruta estática
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/exps", expRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/abouts", aboutRoutes);

//Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req: any, res: any) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req: any, res: any) => {
    res.send("Please set to production");
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
