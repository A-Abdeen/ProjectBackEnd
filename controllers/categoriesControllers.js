const { Category, Ingredient } = require("../db/models");

// FETCH--------------------------------------
exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryId);
    return foundCategory;
  } catch (err) {
    next(err);
  }
};

// CATEGORY LIST----------------------------------
exports.categoryList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Ingredient,
          as: "ingredient",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// SINGLE CATEGORY DETAIL BY ID--------------------  IS IT NORMAL TO SHOW MESSAGE IN CONSOLE?
exports.categoryDetail = async (req, res, next) => {
  res.json(req.category);
};
// DELETE CATEGORY BY ID---------------------------
exports.categoryDelete = async (req, res, next) => {
  try {
    await req.category.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// UPDATE CATEGORY BY ID---------------------------
exports.categoryUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      await req.category.update(req.body);
      res.status(200).json(req.category);
    }
  } catch (err) {
    next(err);
  }
};

// ADD CATEGORY------------------------------------
exports.categoryAdd = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

// ADD INGREDIENT------------------------------------
exports.ingredientAdd = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.categoryId = req.category.id;
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
};
