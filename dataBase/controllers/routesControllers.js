const moduleContenedor = require("../DAOs/contenedor");
const contenedor = new moduleContenedor.contenedor();

async function getProducts(id) {
	if (!id) {
		const data = await contenedor.getAll();
		return data;
	} else {
		const data = await contenedor.getById(id);
		return data;
	}
}

async function saveProducts(req) {
	const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
	console.log(nombre, descripcion, codigo, foto, precio, stock);

	const date = new Date();
	const timestamp = date.toLocaleString();

	if (nombre && descripcion && codigo && foto && precio && stock) {
		const newProduct = {
			nombre,
			descripcion,
			codigo,
			foto,
			precio,
			stock,
			timestamp,
		};

		const id = await contenedor.save(newProduct);

		return id;
	} else {
		console.log("Existe al menos un campo vacio");
		return {};
	}
}

async function modifyProduct(req, res) {
	const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
	const id = req.params.id;

	const newProduct = {
		nombre,
		descripcion,
		codigo,
		foto,
		precio,
		stock,
	};

	await contenedor.modify(newProduct, id);

	return res.send(newProduct);
}

module.exports = {
	getProducts,
	saveProducts,
	modifyProduct,
};
