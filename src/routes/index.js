const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const supplierController = require('../controllers/supplierController');
const associationController = require('../controllers/productSupplierController');

// PRODUTOS
router.post('/produtos', productController.criar);
router.get('/produtos', productController.listar);
router.get('/produtos/:id', productController.buscar);
router.put('/produtos/:id', productController.atualizar);
router.delete('/produtos/:id', productController.deletar);

// FORNECEDORES 
router.post('/fornecedores', supplierController.criar);
router.get('/fornecedores', supplierController.listar);
router.get('/fornecedores/:id', supplierController.buscar);
router.put('/fornecedores/:id', supplierController.atualizar);
router.delete('/fornecedores/:id', supplierController.deletar);

// ASSOCIAÇÃO 
router.post('/associar', associationController.associar);
router.delete('/desassociar', associationController.desassociar);

router.get('/produtos/:produto_id/fornecedores', associationController.fornecedoresDoProduto);
router.get('/fornecedores/:fornecedor_id/produtos', associationController.produtosDoFornecedor);

module.exports = router;
