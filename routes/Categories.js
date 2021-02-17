const express = require("express");
const {
  categoryList,
  categoryDetail,
  categoryDelete,
  categoryUpdate,
  categoryAdd,
  fetchCategory,
  ingredientAdd,
} = require("../controllers/categoriesControllers");

const router = express.Router();
const upload = require("../middleware/multer.js");

router.param("categoryId", async (req, res, next, categoryId) => {
  const foundCategory = await fetchCategory(categoryId, next);
  if (foundCategory) {
    req.category = foundCategory;
    next();
  } else {
    next({
      status: 404,
      message: "Entry not found",
    });
  }
});

// CATEGORY LIST-----------------------------------
router.get("/", categoryList);

// SINGLE CATEGORY DETAIL BY ID-------------------- (BACKEND ONLY)
router.get("/:categoryId", categoryDetail);

// DELETE CATEGORY BY ID--------------------------- (BACKEND ONLY)
router.delete("/:categoryId", categoryDelete);

// UPDATE CATEGORY BY ID--------------------------- (BACKEND ONLY)
router.put("/:categoryId", upload.single("image"), categoryUpdate);

// ADD CATEGORY------------------------------------
router.post("/", upload.single("image"), categoryAdd);

// ADD INGREDIENT----------------------------------
router.post("/:categoryId/ingredients", upload.single("image"), ingredientAdd);

module.exports = router;
