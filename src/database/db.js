const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false 
  },
  // Configurações adicionais para serverless
  max: 1, // Máximo de conexões 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Testa conexão
pool.on('error', (err) => {
  console.error('Erro inesperado no pool do PostgreSQL:', err);
});

module.exports = pool;
