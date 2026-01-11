const express = require("express");
const cors = require("cors");
const { createTables } = require("./src/database/migrations");

const app = express();
app.use(cors());
app.use(express.json());

createTables().then(() => console.log("Banco Neon conectado"));

app.use("/api", require("./src/routes"));

app.get("/", (req, res) => {
  res.send("API Distribuidora online ☁️");
});

module.exports = app;
