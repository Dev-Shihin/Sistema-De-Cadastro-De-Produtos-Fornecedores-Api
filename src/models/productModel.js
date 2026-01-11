const db = require('../database/db');

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

    if (produto.estoque === undefined || produto.estoque < 0) {
        erros.push('Estoque deve ser um valor positivo');
    }

    return erros;
}

/* =======================
   CRUD - PostgreSQL
======================= */

// Criar produto
async function criarProduto(produto) {
    const erros = validarProduto(produto);
    if (erros.length > 0) {
        throw { erros };
    }

    const { nome, preco, estoque, categoria } = produto;

    const result = await db.query(
        `INSERT INTO produtos (nome, preco, estoque, categoria) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [nome.trim(), preco, estoque || 0, categoria || null]
    );

    return result.rows[0];
}

// Listar todos os produtos
async function listarProdutos() {
    const result = await db.query(
        'SELECT * FROM produtos ORDER BY nome'
    );

    return result.rows;
}

// Buscar produto por ID
async function buscarProdutoPorId(id) {
    if (!id || isNaN(id)) {
        throw { erro: 'ID inválido' };
    }

    const result = await db.query(
        'SELECT * FROM produtos WHERE id = $1',
        [id]
    );

    if (result.rows.length === 0) {
        throw { erro: 'Produto não encontrado' };
    }

    return result.rows[0];
}

// Atualizar produto
async function atualizarProduto(id, produto) {
    const erros = validarProduto(produto);
    if (erros.length > 0) {
        throw { erros };
    }

    const { nome, preco, estoque, categoria } = produto;

    const result = await db.query(
        `UPDATE produtos 
         SET nome = $1, preco = $2, estoque = $3, categoria = $4
         WHERE id = $5 RETURNING *`,
        [nome.trim(), preco, estoque || 0, categoria || null, id]
    );

    if (result.rows.length === 0) {
        throw { erro: 'Produto não encontrado' };
    }

    return result.rows[0];
}

// Deletar produto
async function deletarProduto(id) {
    if (!id || isNaN(id)) {
        throw { erro: 'ID inválido' };
    }

    const result = await db.query(
        'DELETE FROM produtos WHERE id = $1 RETURNING *',
        [id]
    );

    if (result.rows.length === 0) {
        throw { erro: 'Produto não encontrado' };
    }

    return { 
        id, 
        deletado: true,
        produto: result.rows[0]
    };
}

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
};