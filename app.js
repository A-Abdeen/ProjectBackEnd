const express = require("express");
const app = express();
const db = require("./db/models");

app.use(express.json());

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
