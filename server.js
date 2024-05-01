const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

//Routes
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/categories");

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log(error);
  });

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
