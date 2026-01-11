const service = require('../services/supplierService');

async function criar(req, res) {
  try {
    const result = await service.criarFornecedor(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function listar(req, res) {
  try {
    const result = await service.listarFornecedores();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function buscar(req, res) {
  try {
    const result = await service.buscarFornecedor(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function atualizar(req, res) {
  try {
    const result = await service.atualizarFornecedor(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deletar(req, res) {
  try {
    const result = await service.deletarFornecedor(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json(err);
  }
}

module.exports = { criar, listar, buscar, atualizar, deletar };
