const express = require("express");
const conection = require("./data/config");
var cors = require("cors");
const app = express();
const PORT = 3030;

conection();

const productosRutas = require("./routes/productos");
const carritoRutas = require("./routes/carrito");

app.use(express.json());
app.use(cors());
app.use("/api/productos", productosRutas);
app.use("/api/carrito", carritoRutas);

app.listen(PORT, () => {
	console.log("Server is running");
});
