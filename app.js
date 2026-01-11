const express = require('express');
const cors = require('cors');

const database = require('./src/database/db');
const { createTables } = require('./src/database/migrations');
const routes = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());

// Conecta no banco e roda migrations
database.connect()
  .then(db => createTables(db))
  .catch(err => console.error(err));

// Rotas da API
app.use('/api', routes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('Servidor da Distribuidora rodando!');
});

// Porta
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 API ativa em http://localhost:${PORT}`);
});
