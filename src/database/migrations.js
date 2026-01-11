const createTables = (db) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {

      db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          descricao TEXT,
          preco REAL NOT NULL CHECK(preco >= 0),
          codigo_barras TEXT UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`CREATE INDEX IF NOT EXISTS idx_produtos_codigo_barras ON produtos(codigo_barras)`);

      db.run(`
        CREATE TABLE IF NOT EXISTS fornecedores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          cnpj TEXT UNIQUE NOT NULL,
          endereco TEXT,
          contato TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`CREATE INDEX IF NOT EXISTS idx_fornecedores_cnpj ON fornecedores(cnpj)`);

      db.run(`
        CREATE TABLE IF NOT EXISTS produto_fornecedor (
          produto_id INTEGER NOT NULL,
          fornecedor_id INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (produto_id, fornecedor_id),
          FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
          FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) reject(err);
        else {
          console.log('Migrações executadas com sucesso!');
          resolve();
        }
      });

    });
  });
};

module.exports = { createTables };
