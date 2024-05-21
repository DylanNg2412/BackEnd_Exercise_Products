// load all the models
const Product = require("../models/product");
const getProducts = async (category, perPage = 6, page = 1) => {
  try {
    let filters = {};
    if (category) {
      filters.category = category;
    }
    /* 
      sorting > 1 is asc, -1 is desc
      default sorting is sort by _id > { _id: 1 }
      */
    /* 
      Pagination
      .limit() // limit the amount of items returned
      .skip() // skip given amount
    */
    const products = await Product.find(filters)
      .populate("category")
      .limit(perPage) // 4
      .skip((page - 1) * perPage) //
      .sort({ _id: -1 });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

// get 1 product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// add
const addProduct = async (name, description, price, category) => {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  // save the product with mongodb
  await newProduct.save();
  return newProduct;
};

// update
const updateProduct = async (
  product_id,
  name,
  description,
  price,
  category,
  image
) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    product_id,
    {
      name,
      description,
      price,
      category,
      image,
    },
    { new: true } // send in the updated data
  );
  return updatedProduct;
};

// delete
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
