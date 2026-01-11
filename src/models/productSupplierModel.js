const db = require('../database/db');

/* ===========================
   Associação Produto-Fornecedor
=========================== */

// Associa um produto a um fornecedor
async function associarProdutoFornecedor(produto_id, fornecedor_id) {
  if (!produto_id || !fornecedor_id) {
    throw { erro: 'Produto e Fornecedor são obrigatórios' };
  }

  try {
    const result = await db.query(
      `INSERT INTO produto_fornecedor (produto_id, fornecedor_id)
       VALUES ($1, $2) RETURNING *`,
      [produto_id, fornecedor_id]
    );

    return result.rows[0];
  } catch (err) {
    // Verifica se é erro de chave duplicada
    if (err.code === '23505') {
      throw { erro: 'Associação já existe' };
    }
    // Verifica se é erro de foreign key (produto ou fornecedor não existe)
    if (err.code === '23503') {
      throw { erro: 'Produto ou Fornecedor não encontrado' };
    }
    throw err;
  }
}

// Remove associação
async function desassociarProdutoFornecedor(produto_id, fornecedor_id) {
  if (!produto_id || !fornecedor_id) {
    throw { erro: 'Produto e Fornecedor são obrigatórios' };
  }

  const result = await db.query(
    `DELETE FROM produto_fornecedor
     WHERE produto_id = $1 AND fornecedor_id = $2
     RETURNING *`,
    [produto_id, fornecedor_id]
  );

  if (result.rows.length === 0) {
    throw { erro: 'Associação não encontrada' };
  }

  return { 
    produto_id, 
    fornecedor_id, 
    removido: true 
  };
}

// Lista fornecedores de um produto
async function listarFornecedoresDoProduto(produto_id) {
  if (!produto_id || isNaN(produto_id)) {
    throw { erro: 'ID do produto inválido' };
  }

  const result = await db.query(
    `SELECT f.*
     FROM fornecedores f
     INNER JOIN produto_fornecedor pf ON pf.fornecedor_id = f.id
     WHERE pf.produto_id = $1
     ORDER BY f.nome`,
    [produto_id]
  );

  return result.rows;
}

// Lista produtos de um fornecedor
async function listarProdutosDoFornecedor(fornecedor_id) {
  if (!fornecedor_id || isNaN(fornecedor_id)) {
    throw { erro: 'ID do fornecedor inválido' };
  }

  const result = await db.query(
    `SELECT p.*
     FROM produtos p
     INNER JOIN produto_fornecedor pf ON pf.produto_id = p.id
     WHERE pf.fornecedor_id = $1
     ORDER BY p.nome`,
    [fornecedor_id]
  );

  return result.rows;
}

module.exports = {
  associarProdutoFornecedor,
  desassociarProdutoFornecedor,
  listarFornecedoresDoProduto,
  listarProdutosDoFornecedor
};