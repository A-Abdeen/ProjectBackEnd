const express = require("express");
const db = require("./db/models");
const bodyParser = require("body-parser");
const ingredientRoutes = require("./routes/ingredients");
const categoryRoutes = require("./routes/categories");

const path = require("path");
const app = express();

// Middleware---------------------------------
app.use(bodyParser.json());
app.use("/ingredients", ingredientRoutes);
app.use("/categories", categoryRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// NOT FOUND----------------------------------
app.use((req, res, next) => {
  next({ status: 404, message: "Page not found" });
});

// ERROR--------------------------------------
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// DATABASE SYNC------------------------------
db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

app.listen(8000, () => console.log(`Running on localhost 8000`));
