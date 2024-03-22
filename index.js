const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.use(cors());

// Connect to database
//not using dotenv here for simplicity of testing my app
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.8fcngch.mongodb.net/WareWe")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
