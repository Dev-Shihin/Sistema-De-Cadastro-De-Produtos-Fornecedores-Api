const database = require('../database/db');

/* =======================
   Validação
======================= */
function validarProduto(produto) {
    const erros = [];

    if (!produto.nome || produto.nome.trim() === '') {
        erros.push('Nome é obrigatório');
    }

    if (produto.preco === undefined || produto.preco < 0) {
        erros.push('Preço deve ser um valor positivo');
    }

    if (produto.codigo_barras && typeof produto.codigo_barras !== 'string') {
        erros.push('Código de barras inválido');
    }

    return erros;
}

/* =======================
   CRUD
======================= */

// Criar produto
function criarProduto(produto) {
    return new Promise((resolve, reject) => {
        const erros = validarProduto(produto);
        if (erros.length > 0) return reject({ erros });

        const db = database.getConnection();

        const sql = `
            INSERT INTO produtos (nome, descricao, preco, codigo_barras)
            VALUES (?, ?, ?, ?)
        `;

        db.run(sql, [
            produto.nome.trim(),
            produto.descricao || null,
            produto.preco,
            produto.codigo_barras || null
        ], function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, ...produto });
        });
    });
}

// Listar todos os produtos
function listarProdutos() {
    return new Promise((resolve, reject) => {
        const db = database.getConnection();

        db.all(`SELECT * FROM produtos ORDER BY nome`, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows || []);
        });
    });
}

// Buscar produto por ID
function buscarProdutoPorId(id) {
    return new Promise((resolve, reject) => {
        if (!id || isNaN(id)) return reject({ erro: 'ID inválido' });

        const db = database.getConnection();

        db.get(`SELECT * FROM produtos WHERE id = ?`, [id], (err, row) => {
            if (err) return reject(err);
            if (!row) return reject({ erro: 'Produto não encontrado' });
            resolve(row);
        });
    });
}

// Atualizar produto
function atualizarProduto(id, produto) {
    return new Promise((resolve, reject) => {
        const erros = validarProduto(produto);
        if (erros.length > 0) return reject({ erros });

        const db = database.getConnection();

        const sql = `
            UPDATE produtos 
            SET nome = ?, descricao = ?, preco = ?, codigo_barras = ?
            WHERE id = ?
        `;

        db.run(sql, [
            produto.nome.trim(),
            produto.descricao || null,
            produto.preco,
            produto.codigo_barras || null,
            id
        ], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject({ erro: 'Produto não encontrado' });
            resolve({ id, ...produto });
        });
    });
}

// Deletar produto
function deletarProduto(id) {
    return new Promise((resolve, reject) => {
        if (!id || isNaN(id)) return reject({ erro: 'ID inválido' });

        const db = database.getConnection();

        db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject({ erro: 'Produto não encontrado' });
            resolve({ id, deletado: true });
        });
    });
}

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
};
