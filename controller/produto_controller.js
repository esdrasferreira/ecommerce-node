const produtoDao = require("../repositorio/produto_dao");
const conexao = require("../util/conexao");
const Produto = require("../model/produto");

var totalPorPagina = 5;
var pagina = 0;
var offset = 0;

class ProdutoController {
	todosPaginacao = (req, res, next) => {
		const { page, limit } = req.query;
		console.log("parametro page: " + page + " || limit : " + limit);

		if (page == null || limit == null) {
			this.totalPorPagina = 5;
			offset = 0;
		} else {
			totalPorPagina = parseInt(limit);
			pagina = parseInt(page);
			if (pagina > 0) {
				offset = totalPorPagina * (pagina - 1);
			} else {
				pagina = 1;
				offset = totalPorPagina * (pagina - 1);
			}
		}
		let numPage = 0;
		let rows = 0;
		new produtoDao(conexao).countPages().then(result => {
			if (result > 0) {
				console.log("result : " + result);
				numPage = Math.ceil(result / totalPorPagina);
				rows = result;
				console.log("numPage01 :" + numPage);
			} else {
				console.log("else result : " + result);
				numPage = 0;
			}
		});

		console.log("numPage::: " + numPage);
		const results = {};
		new produtoDao(conexao)

			.todosComPaginacao(totalPorPagina, offset)
			.then(result => {
				if (result.length === 0) {
					res.json({ mensagem: "Não existem produtos" });
				} else {
					results.results = result;
					results.paginacao = {
						pagina: pagina,
						previous: pagina > 1 ? pagina - 1 : undefined,
						next: pagina < numPage ? pagina + 1 : undefined,
						totalOffPages: numPage,
						limit: totalPorPagina,
						rows: rows
					};

					res.json(results);
				}
			})
			.catch(next);
	};

	todos = (req, res, next) => {
		new produtoDao(conexao)
			.todos()
			.then(result => {
				if (result.length === 0) res.json({ mensagem: "Não existem produtos" });
				else res.json(result);
			})
			.catch(next);
	};

	cadastro = (req, res, next) => {
		const { categoriaId, nomeproduto, descricao, valor } = req.body;

		const prod = new Produto(null, categoriaId, nomeproduto, descricao, valor);

		new produtoDao(conexao)
			.cadastrar(prod)
			.then(resultado => {
				if (resultado.length === 0)
					return res.json({ mensagem: "Nao cadastrou" });

				res.json(resultado);
			})
			.catch(next);
	};

	update = (req, res, next) => {
		const { produtoid, categoriaId, nomeproduto, descricao, valor } = req.body;
		const prod = new Produto(
			produtoid,
			categoriaId,
			nomeproduto,
			descricao,
			valor
		);

		new produtoDao(conexao)
			.update(prod)
			.then(result => {
				if (result.length === 0) res.json({ mensagem: "Não foi atualizado" });
				else res.json(result);
			})
			.catch(next);
	};

	delet = (req, res, next) => {
		const { produtoid } = req.body;
		const prod = new Produto(produtoid, null, null, null, null);

		new produtoDao(conexao)
			.delet(prod)
			.then(result => {
				if (result.length === 0) res.json({ mensagem: "Não foi deletado" });
				else res.json(result);
			})
			.catch(next);
	};
}
module.exports = ProdutoController;
