const Product = require("../models/product");
const Category = require("../models/category");
const { updateProduct } = require("./product");

const getCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const addNewCategory = async (name) => {
  const newCategory = new Category({
    name: name,
  });
  //save
  await newCategory.save();
  return newCategory;
};

const updateCategory = async (_id, name) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    {
      name: name,
    },
    {
      new: true,
    }
  );
  return updatedCategory;
};

const deleteCategory = async (_id) => {
  // make sure if there is no category assigned to the products
  const products = await Product.find({ category: _id });
  //if product is not empty
  if (products && products.length > 0) {
    throw new Error("This category is currently in use");
  }
  const deletedCategory = await Category.findByIdAndDelete(_id);
  return deletedCategory;
};

module.exports = {
  getCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
