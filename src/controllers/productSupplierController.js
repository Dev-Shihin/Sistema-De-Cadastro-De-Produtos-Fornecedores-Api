const service = require('../services/productSupplierService');

async function associar(req, res) {
  try {
    const result = await service.associar(req.body.produto_id, req.body.fornecedor_id);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function desassociar(req, res) {
  try {
    const result = await service.desassociar(req.body.produto_id, req.body.fornecedor_id);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function fornecedoresDoProduto(req, res) {
  try {
    const result = await service.fornecedoresDoProduto(req.params.produto_id);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function produtosDoFornecedor(req, res) {
  try {
    const result = await service.produtosDoFornecedor(req.params.fornecedor_id);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = { associar, desassociar, fornecedoresDoProduto, produtosDoFornecedor };
