const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false 
  },
  // Configurações otimizadas para serverless
  max: 1, // Apenas 1 conexão por função
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000, // Timeout de 5s
});

// Log de erros do pool
pool.on('error', (err) => {
  console.error('Erro inesperado no pool PostgreSQL:', err);
});

// Testa conexão (opcional)
pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL');
});

module.exports = pool;