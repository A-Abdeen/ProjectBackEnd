const express = require("express");
const Router = express.Router();
const { Ingredient } = require("../db/models");
const {
  ingredientFind,
  ingredientCreate,
  getIngredientById,
  ingredientUpdate,
  deleteIngredient,
  fetchIntgredient,
} = require("../controllers/ingredientsController");

Router.param("ingredientId", async (req, res, next, ingredientId) => {
  const foundIngredient = await fetchIntgredient(ingredientId, next);
  if (foundIngredient) {
    req.ingredient = foundIngredient;
    next();
  } else {
    const err = new Error("No ingredient found by this ID");
    err.status = 404;
    next(err);
  }
});

Router.get("/", ingredientFind);

Router.post("/", ingredientCreate);

Router.get("/:ingredientId", getIngredientById);

Router.delete("/:ingredientId", deleteIngredient);

Router.put("/:ingredientId", ingredientUpdate);

module.exports = Router;
