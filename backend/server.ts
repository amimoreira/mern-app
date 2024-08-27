const express = require('express');
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
import { errorHandler } from "./middleware/errorMiddleware";
const port = process.env.PORT || 5000;

connectDB();
 
const app = express();
 
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/usersRoutes"))
app.use("/api/exps", require("./routes/expRoutes"))
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/abouts", require("./routes/aboutRoutes"))

app.use(errorHandler)
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


 