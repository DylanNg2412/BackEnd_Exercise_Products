const Product = require("../models/product");

const getProducts = async (category) => {
  let filters = {};
  if (category) {
    filters.category = category;
  }

  const products = await Product.find(filters);
  return products;
};

// add
const addProduct = async (name, description, price, category) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  await newProduct.save();
  return newProduct;
};

// update
const updateProduct = async (
  product_id,
  name,
  description,
  price,
  category
) => {
  const product = await Product.findById(product_id);
  if (!product) throw new Error("Product not found");
  const updatedProduct = await Product.findByIdAndUpdate(
    product_id,
    {
      name,
      description,
      price,
      category,
    },
    { new: true } // send in the updated data
  );
  return updatedProduct;
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
};
