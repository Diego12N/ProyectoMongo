const express = require("express");
const conection = require("./data/config");
var cors = require("cors");
const app = express();
const PORT = 4000;
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

conection();

const productosRutas = require("./routes/productos");
const carritoRutas = require("./routes/carrito");

app.use(express.json());
app.use(cors());
app.use("/api/productos", productosRutas);
app.use("/api/carrito", carritoRutas);

io.on("connection", (socket) => {
	/* console.log(socket.id);
	console.log("a user connected"); */
});

server.listen(PORT, () => {
	console.log("Server is running");
});
