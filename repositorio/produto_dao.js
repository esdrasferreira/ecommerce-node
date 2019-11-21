class ProdutoDao {
	constructor(conexao) {
		this.conexao = conexao;
	}
	totalEncontrado = 0;

	countPages() {
		const rows = new Promise((resolve, reject) => {
			this.conexao.query(
				"select count(*) as numRows from andregon_ecommerce.produtos",
				(err, rows) => {
					if (err) {
						return err;
					} else {
						rows = rows[0].numRows;
						console.log("numero de linhas = " + rows);
					}

					resolve(rows);
				}
			);
		});

		console.log("return p que sera numRows: " + rows);
		return rows;
	}

	todosComPaginacao(totalPorPagina, offset) {
		console.log(
			"|| ofsset: " + offset + " ||totalPorPagina: " + totalPorPagina
		);
		const p = new Promise((resolve, reject) => {
			this.conexao.query(
				"select andregon_ecommerce.produtos.*, andregon_ecommerce.categorias.* from andregon_ecommerce.produtos, andregon_ecommerce.categorias\n" +
					"where andregon_ecommerce.produtos.categoriaId = andregon_ecommerce.categorias.categoriaId order by andregon_ecommerce.produtos.produtoId desc limit ? offset ?",
				[totalPorPagina, offset],

				(err, p) => {
					if (err) return reject("erro");

					resolve(p);
				}
			);
		});
		return p;
	}

	todos() {
		const p = new Promise((resolve, reject) => {
			this.conexao.query(
				"SELECT * FROM andregon_ecommerce.produtos order by produtoId desc",
				(err, p) => {
					if (err) return reject(erro);

					resolve(p);
				}
			);
		});
		return p;
	}

	cadastrar(produto) {
		const p = new Promise((resolve, reject) => {
			this.conexao.query(
				"INSERT INTO `andregon_ecommerce`.`produtos` (`categoriaId`, `nomeproduto`, `descricao`, `valor`) VALUES (?, ?, ?, ?)",
				[
					produto.categoriaId,
					produto.nomeproduto,
					produto.descricao,
					produto.valor
				],
				(err, p) => {
					if (err) return reject(erro);

					resolve(p);
				} //end err,p
			); //end query
		}); //end Promisse
		return p;
	}

	update(produto) {
		const p = new Promise((resolve, reject) => {
			this.conexao.query(
				"update andregon_ecommerce.produtos set andregon_ecommerce.produtos.categoriaId = ?, andregon_ecommerce.produtos.nomeproduto = ?, andregon_ecommerce.produtos.descricao = ?, andregon_ecommerce.produtos.valor = ? where andregon_ecommerce.produtos.produtoId = ?",
				[
					produto.categoriaId,
					produto.nomeproduto,
					produto.descricao,
					produto.valor,
					produto.produtoid
				],
				(err, p) => {
					if (err) return reject(erro);

					resolve(p);
				} //end err,p
			); //end query
		}); //end Promisse

		return p;
	}

	delet(produto) {
		const p = new Promise((resolve, reject) => {
			this.conexao.query(
				"DELETE FROM andregon_ecommerce.produtos WHERE produtoId = ?",
				[produto.produtoid],
				(err, p) => {
					if (err) return reject(erro);

					resolve(p);
				} //end err,p
			); //end query
		}); //end Promisse

		return p;
	}
}
module.exports = ProdutoDao;
