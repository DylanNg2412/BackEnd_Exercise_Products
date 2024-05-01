const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  price: { type: Number, require: true },
  category: { type: String, require: true },
});

// convert the schema to a model
const Product = model("Product", productSchema);
module.exports = Product;
