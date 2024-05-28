const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGODB_URL } = require("./config");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());

// set the uploads folder as a static path
app.use("/uploads", express.static("uploads"));

// middleware to setup a CORS policy
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

// apply the CORS to middleware
app.use(corsHandler);

//Routes
const productRoute = require("./routes/product");
const categoriesRoute = require("./routes/category");
const ordersRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const imagesRoute = require("./routes/image");
const userRoute = require("./routes/user");

app.use("/products", productRoute);
app.use("/categories", categoriesRoute);
app.use("/orders", ordersRoute);
app.use("/payment", paymentRoute);
app.use("/images", imagesRoute);
app.use("/users", userRoute);

mongoose
  .connect(MONGODB_URL + "ecommerce")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log(error);
  });

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
