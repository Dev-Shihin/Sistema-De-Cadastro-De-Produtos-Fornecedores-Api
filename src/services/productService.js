const productModel = require('../models/productModel');

function criarProduto(produto) {
  return productModel.criarProduto(produto);
}

function listarProdutos() {
  return productModel.listarProdutos();
}

function buscarProduto(id) {
  return productModel.buscarProdutoPorId(id);
}

function atualizarProduto(id, produto) {
  return productModel.atualizarProduto(id, produto);
}

function deletarProduto(id) {
  return productModel.deletarProduto(id);
}

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto
};
