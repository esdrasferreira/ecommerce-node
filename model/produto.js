class Produto{

    constructor(produtoid, categoriaId, nomeproduto, descricao, valor){
        this.produtoid = produtoid;
        this.categoriaId = categoriaId;
        this.nomeproduto =nomeproduto;
        this.descricao =descricao;
        this.valor =valor;
    }
}

module.exports = Produto;