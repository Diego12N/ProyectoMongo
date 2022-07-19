const routes = require("express").Router();
const moduleContenedor = require("../DAOs/contenedor");
const contenedor = new moduleContenedor.contenedor();
const moduleConstructor = require("../DAOs/carritoContructor");
const carritoContenedor = new moduleConstructor.contenedorCarrito();

routes.get("/:id", async (req, res) => {
	let cart = await carritoContenedor.getCarrito(req.params.id);

	res.status(200).send(cart);
});

// Crea un carrito y devuelve su id
routes.post("/", (req, res) => {
	let ID_NewCart = carritoContenedor.createCart();
	res.status(200).send(ID_NewCart);
});

// Para incorporar productos al carrito por su id de producto
routes.post("/:id/productos", (req, res) => {
	const cartId = req.params.id;
	const productID = req.body.id;

	let carrito = carritoContenedor.addToCart(cartId, productID);

	res.send(carrito);
});

// //Me permite listar todos los productos guardados en el carrito
routes.get("/:id/productos", async (req, res) => {
	const cart = await carritoContenedor.getCarrito(req.params.id);
	const productsID = cart.idProductos;

	const productos = await Promise.all(
		productsID.map((id) => {
			return contenedor.getById(id);
		})
	);

	res.send(productos);
});

//Vacía un carrito y lo elimina.
routes.delete("/:id", async (req, res) => {
	await carritoContenedor.deleteCart(req.params.id);

	res.status(200).send("Carrito Eliminado");
});

//Eliminar un producto del carrito por su id de carrito y de producto

routes.delete("/:id/productos/:id_prod", async (req, res) => {
	const ID_Cart = req.params.id;
	const ID_Product = req.params.id_prod;
	await carritoContenedor.deleteProductFromCart(ID_Cart, ID_Product);
});

module.exports = routes;
