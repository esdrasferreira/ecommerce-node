const express = require("express");
const router = express.Router();

const produto = require("./produto_router");
router.use("/produto", produto);

// const autorizacao = require('./autorizacao_router')
// router.use('/autorizacao', autorizacao)

module.exports = router;
