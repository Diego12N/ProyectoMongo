const mongoose = require("mongoose");

const carritoSchema = {
	timestamp: {type: Date},
	idProductos: {type: Array, require: true},
};

const CarritoModel = mongoose.model("carrito", carritoSchema);

module.exports = CarritoModel;
