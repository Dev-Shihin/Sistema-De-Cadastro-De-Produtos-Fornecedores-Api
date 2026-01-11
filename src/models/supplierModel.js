const db = require('../database/db');

/* =======================
   Validação
======================= */
function validarFornecedor(fornecedor) {
  const erros = [];

  if (!fornecedor.nome || fornecedor.nome.trim() === '') {
    erros.push('Nome é obrigatório');
  }

  if (!fornecedor.cnpj || fornecedor.cnpj.trim() === '') {
    erros.push('CNPJ é obrigatório');
  }

  return erros;
}

/* =======================
   CRUD - PostgreSQL
======================= */

// Criar fornecedor
async function criarFornecedor(fornecedor) {
  const erros = validarFornecedor(fornecedor);
  if (erros.length > 0) {
    throw { erros };
  }

  const { nome, cnpj, telefone, email } = fornecedor;

  const result = await db.query(
    `INSERT INTO fornecedores (nome, cnpj, telefone, email) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nome.trim(), cnpj.trim(), telefone || null, email || null]
  );

  return result.rows[0];
}

// Listar todos os fornecedores
async function listarFornecedores() {
  const result = await db.query(
    'SELECT * FROM fornecedores ORDER BY nome'
  );

  return result.rows;
}

// Buscar fornecedor por ID
async function buscarFornecedorPorId(id) {
  if (!id || isNaN(id)) {
    throw { erro: 'ID inválido' };
  }

  const result = await db.query(
    'SELECT * FROM fornecedores WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw { erro: 'Fornecedor não encontrado' };
  }

  return result.rows[0];
}

// Atualizar fornecedor
async function atualizarFornecedor(id, fornecedor) {
  const erros = validarFornecedor(fornecedor);
  if (erros.length > 0) {
    throw { erros };
  }

  const { nome, cnpj, telefone, email } = fornecedor;

  const result = await db.query(
    `UPDATE fornecedores 
     SET nome = $1, cnpj = $2, telefone = $3, email = $4
     WHERE id = $5 RETURNING *`,
    [nome.trim(), cnpj.trim(), telefone || null, email || null, id]
  );

  if (result.rows.length === 0) {
    throw { erro: 'Fornecedor não encontrado' };
  }

  return result.rows[0];
}

// Deletar fornecedor
async function deletarFornecedor(id) {
  if (!id || isNaN(id)) {
    throw { erro: 'ID inválido' };
  }

  const result = await db.query(
    'DELETE FROM fornecedores WHERE id = $1 RETURNING *',
    [id]
  );

  if (result.rows.length === 0) {
    throw { erro: 'Fornecedor não encontrado' };
  }

  return { 
    id, 
    deletado: true,
    fornecedor: result.rows[0]
  };
}

module.exports = {
  criarFornecedor,
  listarFornecedores,
  buscarFornecedorPorId,
  atualizarFornecedor,
  deletarFornecedor
};