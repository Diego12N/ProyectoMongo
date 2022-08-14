const {
	getProducts,
	getCartProducts,
} = require("../controllers/routesControllers");
const CarritoModel = require("../models/carritoModel");

class Carrito {
	constructor(idProduct) {
		this.id = idProduct;
	}

	createCart() {
		const date = new Date();
		const timestamp = date;
		const cart = new CarritoModel({
			timestamp: timestamp,
			idProductos: [],
		});

		cart.save();

		return JSON.stringify(cart._id.valueOf());
	}

	async getCarrito(id) {
		try {
			const carrito = await CarritoModel.findOne({_id: id}, {_id: 0, __v: 0});
			return carrito;
		} catch (error) {
			console.log(error);
		}
	}

	async addToCart(idCarrito, idProducto) {
		try {
			await CarritoModel.updateOne(
				{_id: idCarrito},
				{$push: {idProductos: idProducto}}
			);
		} catch (err) {
			console.log(err);
		}
	}

	async deleteProductFromCart(idCarrito, idProducto) {
		try {
			const deleted = await CarritoModel.updateOne(
				{_id: idCarrito},
				{$pull: {idProductos: {$eq: idProducto}}}
			);

			console.log(deleted);
		} catch (err) {
			console.log(err);
		}
	}

	async deleteCart(id) {
		try {
			await CarritoModel.deleteOne({_id: id});
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports.contenedorCarrito = Carrito;
