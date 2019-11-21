const express = require("express");
const router = express.Router();
const ProdutoController = require("../../controller/produto_controller");

const produtoController = new ProdutoController();

router.get("/todos-page", produtoController.todosPaginacao);
router.get("/todos", produtoController.todos);
router.post("/cadastro", produtoController.cadastro);
router.post("/update", produtoController.update);
router.post("/delet", produtoController.delet);

module.exports = router;
