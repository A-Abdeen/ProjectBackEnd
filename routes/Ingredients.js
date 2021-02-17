const express = require("express");
const {
  ingredientList,
  ingredientDetail,
  ingredientDelete,
  ingredientUpdate,
  fetchIngredient,
} = require("../controllers/ingredientsControllers");

const router = express.Router();
const upload = require("../middleware/multer.js");

// ROUTE PARAM FOR DETAIL/DELETE/UPDATE
router.param("ingredientId", async (req, res, next, ingredientId) => {
  const foundIngredient = await fetchIngredient(ingredientId, next);
  if (foundIngredient) {
    req.ingredient = foundIngredient;
    next();
  } else {
    next({
      status: 404,
      message: "Entry not found",
    });
  }
});

// INGREDIENT LIST-----------------------------------
router.get("/", ingredientList);

// SINGLE INGREDIENT DETAIL BY ID-------------------- (BACKEND ONLY)
router.get("/:ingredientId", ingredientDetail);

// DELETE INGREDIENT BY ID--------------------------- (BACKEND ONLY)
router.delete("/:ingredientId", ingredientDelete);

// UPDATE INGREDIENT BY ID--------------------------- (BACKEND ONLY)
router.put("/:ingredientId", upload.single("image"), ingredientUpdate);

module.exports = router;
