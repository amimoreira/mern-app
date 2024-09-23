const path = require("path"); 
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
import { errorHandler } from "./middleware/errorMiddleware";
const port = process.env.PORT || 5000;
const cors = require("cors");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/exps", require("./routes/expRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/abouts", require("./routes/aboutRoutes"));

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
