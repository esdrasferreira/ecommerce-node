import ObjectNotFoundError from "../error.js";

export class ProdutoServ {
	getProdutos = async () => {
		const response = await axios.get(
			"http://localhost:3000/api/v1/produto/todos"
		);
		console.log(response);
		const status = response.status;
		console.log("Chamou o servidor");
		if (status === 200) {
			return response;
		} else if (status === 404) {
			throw new ObjectNotFoundError("Local não encontrado");
		} else {
			throw new ObjectNotFoundError("Erro" + response.message);
		}
	};

	takeProdutos = async (pages = 2, limits = 5) => {
		let parametros = {
			params: {
				page: pages,
				limit: limits
			}
		};
		const response = await axios.get(
			"http://localhost:3000/api/v1/produto/todos-page",
			parametros
		);
		console.log(response);
		const status = response.status;
		console.log("Chamou o servidor");
		if (status === 200) {
			return response;
		} else if (status === 404) {
			throw new ObjectNotFoundError("Local não encontrado");
		} else {
			throw new ObjectNotFoundError("Erro" + response.message);
		}
	};

	atualizar = async produto => {
		console.log(
			"produtoid: " +
				produto.produtoid +
				" ||categoriaId: " +
				produto.categoriaId +
				" ||nomeproduto: " +
				produto.nomeproduto +
				" ||descricao: " +
				produto.descricao +
				" ||valor: " +
				produto.valor
		);
		const response = await axios.post(
			"http://localhost:3000/api/v1/produto/update",
			{
				produtoid: produto.produtoid,
				categoriaId: produto.categoriaId,
				nomeproduto: produto.nomeproduto,
				descricao: produto.descricao,
				valor: produto.valor
			}
		);
		const status = response.status;

		if (status === 200) {
			return response;
		} else if (status === 404) {
			throw new ObjectNotFoundError("Local não encontrado");
		} else {
			throw new ObjectNotFoundError("Erro" + response.message);
		}
	};

	deletar = async id => {
		const response = await axios.post(
			"http://localhost:3000/api/v1/produto/delet",
			{
				produtoid: id
			}
		);
	};

	adicionar = async produto => {
		console.log(
			"produtoid: " +
				produto.produtoid +
				" ||categoriaId: " +
				produto.categoriaId +
				" ||nomeproduto: " +
				produto.nomeproduto +
				" ||descricao: " +
				produto.descricao +
				" ||valor: " +
				produto.valor
		);
		const response = await axios.post(
			"http://localhost:3000/api/v1/produto/cadastro",
			{
				categoriaId: produto.categoriaId,
				nomeproduto: produto.nomeproduto,
				descricao: produto.descricao,
				valor: produto.valor
			}
		);
		const status = response.status;

		if (status === 200) {
			return response;
		} else if (status === 404) {
			throw new ObjectNotFoundError("Local não encontrado");
		} else {
			throw new ObjectNotFoundError("Erro" + response.message);
		}
	};
} //END ProdutoServ
