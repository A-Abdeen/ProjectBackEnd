const express = require("express");
const Router = express.Router();

const {
  CategoryFind,
  CategoryCreate,
  getCategoryById,
  CategoryUpdate,
  deleteCategory,
  fetchCategory,
  ingredientCreate,
} = require("../controllers/categoriesController");

Router.param("CategoryId", async (req, res, next, CategoryId) => {
  const foundCategory = await fetchCategory(CategoryId, next);
  if (foundCategory) {
    res.category = foundCategory;
    next();
  } else {
    const err = new Error("No Category found by this ID");
    err.status = 404;
    next(err);
  }
});

Router.get("/", CategoryFind);

Router.post("/:CategoryId/ingredient", ingredientCreate);

Router.post("/", CategoryCreate);

Router.get("/:CategoryId", getCategoryById);

Router.delete("/:CategoryId", deleteCategory);

Router.put("/:CategoryId", CategoryUpdate);

module.exports = Router;
