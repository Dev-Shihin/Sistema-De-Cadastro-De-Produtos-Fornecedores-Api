const supplierModel = require('../models/supplierModel');

function criarFornecedor(fornecedor) {
  return supplierModel.criarFornecedor(fornecedor);
}

function listarFornecedores() {
  return supplierModel.listarFornecedores();
}

function buscarFornecedor(id) {
  return supplierModel.buscarFornecedorPorId(id);
}

function atualizarFornecedor(id, fornecedor) {
  return supplierModel.atualizarFornecedor(id, fornecedor);
}

function deletarFornecedor(id) {
  return supplierModel.deletarFornecedor(id);
}

module.exports = {
  criarFornecedor,
  listarFornecedores,
  buscarFornecedor,
  atualizarFornecedor,
  deletarFornecedor
};
