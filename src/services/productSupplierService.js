const model = require('../models/productSupplierModel');

function associar(produto_id, fornecedor_id) {
  return model.associarProdutoFornecedor(produto_id, fornecedor_id);
}

function desassociar(produto_id, fornecedor_id) {
  return model.desassociarProdutoFornecedor(produto_id, fornecedor_id);
}

function fornecedoresDoProduto(produto_id) {
  return model.listarFornecedoresDoProduto(produto_id);
}

function produtosDoFornecedor(fornecedor_id) {
  return model.listarProdutosDoFornecedor(fornecedor_id);
}

module.exports = {
  associar,
  desassociar,
  fornecedoresDoProduto,
  produtosDoFornecedor
};
