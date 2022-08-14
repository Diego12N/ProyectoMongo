/* const conection = require("../data/options"); */
const ProductoModel = require("../models/productosModel");

/* conection(); */

class Contenedor {
	constructor() {}

	async getAll() {
		try {
			const allProducts = await ProductoModel.find({});
			return allProducts;
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	}

	async getById(id) {
		try {
			const product = await ProductoModel.find(
				{
					_id: id,
				},
				{_id: 0, __v: 0}
			);
			return product[0];
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	}

	async save(obj) {
		try {
			const newproduct = new ProductoModel(obj);
			const product = await newproduct.save();
			const productId = product._id.toString();
			console.log("save", productId);
			return productId;
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	}

	async modify(productProperty, id) {
		try {
			const productModify = await ProductoModel.updateOne(
				{_id: id},
				{$set: productProperty}
			);

			console.log(productModify);
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	}

	async delete(id) {
		try {
			if (!id) {
				const productsDeleted = await ProductoModel.deleteMany({});
				return productsDeleted;
			} else {
				const productDeleted = await ProductoModel.deleteOne({_id: id});
				return productDeleted;
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports.contenedor = Contenedor;
