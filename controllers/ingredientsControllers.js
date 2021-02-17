const { Ingredient, Category } = require("../db/models");

// FETCH--------------------------------------
exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId);
    return foundIngredient;
  } catch (err) {
    next(err);
  }
};

// INGREDIENT LIST----------------------------------
exports.ingredientList = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: ["id"],
      },
    });
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

// SINGLE INGREDIENT DETAIL BY ID--------------------
exports.ingredientDetail = async (req, res, next) => {
  res.json(req.ingredient);
};
// DELETE INGREDIENT BY ID---------------------------
exports.ingredientDelete = async (req, res, next) => {
  try {
    await req.ingredient.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// UPDATE INGREDIENT BY ID---------------------------
exports.ingredientUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      await req.ingredient.update(req.body);
      res.status(200).json(req.ingredient);
    }
  } catch (err) {
    next(err);
  }
};
