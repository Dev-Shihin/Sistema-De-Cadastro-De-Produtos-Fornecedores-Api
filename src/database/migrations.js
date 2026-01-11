const db = require('./db');

async function createTables() {
  try {
    console.log("Iniciando criação de tabelas...");

    await db.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(120) NOT NULL,
        preco NUMERIC(10,2) NOT NULL,
        estoque INT NOT NULL,
        categoria VARCHAR(60),
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✓ Tabela 'produtos' criada/verificada");

    await db.query(`
      CREATE TABLE IF NOT EXISTS fornecedores (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(120) NOT NULL,
        cnpj VARCHAR(20),
        telefone VARCHAR(30),
        email VARCHAR(120)
      );
    `);
    console.log("✓ Tabela 'fornecedores' criada/verificada");

    await db.query(`
      CREATE TABLE IF NOT EXISTS produto_fornecedor (
        produto_id INT REFERENCES produtos(id) ON DELETE CASCADE,
        fornecedor_id INT REFERENCES fornecedores(id) ON DELETE CASCADE,
        PRIMARY KEY (produto_id, fornecedor_id)
      );
    `);
    console.log("✓ Tabela 'produto_fornecedor' criada/verificada");

    console.log("Todas as tabelas foram criadas com sucesso!");
    return true;

  } catch (error) {
    console.error("Erro ao criar tabelas:", error.message);
    throw error;
  }
}

module.exports = { createTables };