// const conection = require("../data/options");
const mongoose = require("mongoose");

// conection();

const productosSchema = new mongoose.Schema({
	nombre: {type: String, require: true},
	descripcion: {type: String, require: true},
	codigo: {type: Number, require: true},
	precio: {type: Number, require: true},
	foto: {type: String, require: true},
	stock: {type: Number, require: true, min: 0},
	timestamp: {type: String},
});

const ProductoModel = mongoose.model("producto", productosSchema);

module.exports = ProductoModel;
