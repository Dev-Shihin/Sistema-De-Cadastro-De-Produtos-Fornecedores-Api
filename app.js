const express = require('express');
const cors = require('cors');
const { createTables } = require('./src/database/migrations');

const app = express();

app.use(cors());
app.use(express.json());

// cria tabelas no start
createTables().then(() => console.log('Banco conectado com sucesso'));

// rotas
app.use('/api', require('./src/routes'));

// healthcheck
app.get('/', (req, res) => {
  res.send('API da Distribuidora rodando na nuvem ☁️');
});

module.exports = app;
