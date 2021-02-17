const express = require("express");
const app = express();
const db = require("./db/models");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());

const categoryRoutes = require("./routes/Categories");
const ingredientRoutes = require("./routes/Ingredients");

app.use("/category", categoryRoutes);
app.use("/ingredient", ingredientRoutes);

app.use((req, res, next) => {
  const err = new Error("Page not found 404");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

const run = async () => {
  try {
    // await db.sequelize.sync({ alter: true });
    await db.sequelize.sync();
    console.log("connection to the database successful");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("error connetion to the database: ", error);
  }
};
run();
