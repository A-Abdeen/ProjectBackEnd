const { Category } = require("../db/models");
const { Ingredient } = require("../db/models");

exports.CategoryFind = async (req, res) => {
  const category = await Category.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Ingredient,
      as: "ingredient",
      attributes: ["id"],
    },
  });
  res.json(category);
};

exports.ingredientCreate = async (req, res) => {
  try {
    req.body.CategoryId = req.Category.id;
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};
exports.CategoryCreate = async (req, res) => {
  console.log(req.body);
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const foundCategory = await Category.findByPk(+req.params.CategoryId);
    if (foundCategory) {
      res.status(200).json(foundCategory);
    } else {
      res.status(404).json({ message: "CategoryfoundCategory not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.CategoryUpdate = async (req, res, next) => {
  const foundCategory = await Category.findByPk(+req.params.CategoryId);
  try {
    if (foundCategory) {
      await foundCategory.update(req.body);
      res.status(204).json(foundCategory);
    } else {
      const err = new Error("No movie found by this ID");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.deleteCategory = async (req, res, next) => {
  const foundCategory = await Category.findByPk(+req.params.CategoryId);
  try {
    if (foundCategory) {
      await foundCategory.destroy();
      res.status(204).end();
    } else {
      const err = new Error("No movie found by this ID");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.fetchCategory = async (CategoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(CategoryId);
    return foundCategory;
  } catch (error) {
    next(error);
  }
};
