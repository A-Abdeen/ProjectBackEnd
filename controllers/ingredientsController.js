const { Ingredient } = require("../db/models");
const { Category } = require("../db/models/Category");

exports.ingredientFind = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Category,
        as: "catergory",
        attributes: ["id"],
      },
    });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.ingredientCreate = async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.getIngredientById = async (req, res, next) => {
  //   res.json(req.ingredient);
  try {
    const foundIngredient = await Ingredient.findByPk(+req.params.ingredientId);
    if (foundIngredient) {
      res.status(204).json(foundIngredient);
    } else {
      const err = new Error("No ingredient found by this ID");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.ingredientUpdate = async (req, res, next) => {
  const foundIngredient = await Ingredient.findByPk(+req.params.ingredientId);
  try {
    if (foundIngredient) {
      await foundIngredient.update(req.body);
      res.status(204).json(foundIngredient);
    } else {
      const err = new Error("No ingredient found by this ID");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.deleteIngredient = async (req, res, next) => {
  const foundIngredient = await Ingredient.findByPk(+req.params.ingredientId);
  try {
    if (foundIngredient) {
      await foundIngredient.destroy();
      res.status(204).end();
    } else {
      const err = new Error("No ingredient found by this ID");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId);
    return foundIngredient;
  } catch (error) {
    next(error);
  }
};
