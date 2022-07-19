const mongoose = require("mongoose");

const URL =
	"mongodb+srv://diego12emma:4145dnna@cluster0.fhs8u.mongodb.net/dataBase?retryWrites=true&w=majority";

async function conection() {
	return mongoose
		.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Conectado");
			return {status: 200};
		})
		.catch((err) => {
			console.log(err);
			return {status: 500};
		});
}

module.exports = conection;
