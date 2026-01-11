const express = require("express");
const cors = require("cors");
// Remova ou comente a importação se não for usar
// const { createTables } = require("./src/database/migrations");

const app = express();
app.use(cors());
app.use(express.json());

// ❌ REMOVA ESTA LINHA COMPLETAMENTE:
// createTables().then(() => console.log("Banco Neon conectado"));

app.use("/api", require("./src/routes"));

app.get("/", (req, res) => {
  res.send("API Distribuidora online ☁️");
});

// Rota para executar migrations manualmente
app.get("/api/setup-database", async (req, res) => {
  try {
    const { createTables } = require("./src/database/migrations");
    await createTables();
    res.json({ 
      success: true, 
      message: "Tabelas criadas com sucesso!" 
    });
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = app;