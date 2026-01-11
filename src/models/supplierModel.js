const database = require('../database/db');

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
   CRUD
======================= */

function criarFornecedor(fornecedor) {
  return new Promise(async (resolve, reject) => {
    const erros = validarFornecedor(fornecedor);
    if (erros.length > 0) return reject({ erros });

    const db = database.getConnection();

    const sql = `
      INSERT INTO fornecedores (nome, cnpj, endereco, contato)
      VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [
      fornecedor.nome.trim(),
      fornecedor.cnpj.trim(),
      fornecedor.endereco || null,
      fornecedor.contato || null
    ], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, ...fornecedor });
    });
  });
}

function listarFornecedores() {
  return new Promise((resolve, reject) => {
    const db = database.getConnection();
    db.all(`SELECT * FROM fornecedores ORDER BY nome`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

function buscarFornecedorPorId(id) {
  return new Promise((resolve, reject) => {
    if (!id || isNaN(id)) return reject({ erro: 'ID inválido' });

    const db = database.getConnection();

    db.get(`SELECT * FROM fornecedores WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return reject({ erro: 'Fornecedor não encontrado' });
      resolve(row);
    });
  });
}

function atualizarFornecedor(id, fornecedor) {
  return new Promise((resolve, reject) => {
    const erros = validarFornecedor(fornecedor);
    if (erros.length > 0) return reject({ erros });

    const db = database.getConnection();

    const sql = `
      UPDATE fornecedores 
      SET nome = ?, cnpj = ?, endereco = ?, contato = ?
      WHERE id = ?
    `;

    db.run(sql, [
      fornecedor.nome.trim(),
      fornecedor.cnpj.trim(),
      fornecedor.endereco || null,
      fornecedor.contato || null,
      id
    ], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return reject({ erro: 'Fornecedor não encontrado' });
      resolve({ id, ...fornecedor });
    });
  });
}

function deletarFornecedor(id) {
  return new Promise((resolve, reject) => {
    if (!id || isNaN(id)) return reject({ erro: 'ID inválido' });

    const db = database.getConnection();

    db.run(`DELETE FROM fornecedores WHERE id = ?`, [id], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return reject({ erro: 'Fornecedor não encontrado' });
      resolve({ id, deletado: true });
    });
  });
}

module.exports = {
  criarFornecedor,
  listarFornecedores,
  buscarFornecedorPorId,
  atualizarFornecedor,
  deletarFornecedor
};
