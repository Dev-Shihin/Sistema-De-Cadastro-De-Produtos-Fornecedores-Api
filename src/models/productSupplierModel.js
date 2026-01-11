const database = require('../database/db');

/* ===========================
   Associação Produto-Fornecedor
=========================== */

// Associa um produto a um fornecedor
function associarProdutoFornecedor(produto_id, fornecedor_id) {
  return new Promise((resolve, reject) => {
    if (!produto_id || !fornecedor_id) {
      return reject({ erro: 'Produto e Fornecedor são obrigatórios' });
    }

    const db = database.getConnection();

    const sql = `
      INSERT INTO produto_fornecedor (produto_id, fornecedor_id)
      VALUES (?, ?)
    `;

    db.run(sql, [produto_id, fornecedor_id], function (err) {
      if (err) return reject(err);
      resolve({ produto_id, fornecedor_id });
    });
  });
}

// Remove associação
function desassociarProdutoFornecedor(produto_id, fornecedor_id) {
  return new Promise((resolve, reject) => {
    const db = database.getConnection();

    const sql = `
      DELETE FROM produto_fornecedor
      WHERE produto_id = ? AND fornecedor_id = ?
    `;

    db.run(sql, [produto_id, fornecedor_id], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return reject({ erro: 'Associação não encontrada' });
      resolve({ produto_id, fornecedor_id, removido: true });
    });
  });
}

// Lista fornecedores de um produto
function listarFornecedoresDoProduto(produto_id) {
  return new Promise((resolve, reject) => {
    const db = database.getConnection();

    const sql = `
      SELECT f.*
      FROM fornecedores f
      INNER JOIN produto_fornecedor pf ON pf.fornecedor_id = f.id
      WHERE pf.produto_id = ?
    `;

    db.all(sql, [produto_id], (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

// Lista produtos de um fornecedor
function listarProdutosDoFornecedor(fornecedor_id) {
  return new Promise((resolve, reject) => {
    const db = database.getConnection();

    const sql = `
      SELECT p.*
      FROM produtos p
      INNER JOIN produto_fornecedor pf ON pf.produto_id = p.id
      WHERE pf.fornecedor_id = ?
    `;

    db.all(sql, [fornecedor_id], (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

module.exports = {
  associarProdutoFornecedor,
  desassociarProdutoFornecedor,
  listarFornecedoresDoProduto,
  listarProdutosDoFornecedor
};
