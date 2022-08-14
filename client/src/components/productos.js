import React, {useContext} from "react";
import {productosContext} from "../context/ProductosProvider";

const deleteURL = "http://localhost:4000/api/productos";

export const Productos = (props) => {
	const lista = props.list;
	const deleteFunction = props.delete;
	const context = useContext(productosContext);
	/* const productListContext = context.productsList; */

	const deleteProduct = (id) => {
		fetch(`${deleteURL}/${id}`, {
			method: "DELETE",
		});

		context.deleteObject(id);
		deleteFunction(true);
	};

	return (
		<div className="list-container">
			{lista.length > 0 ? (
				lista.map((producto) => {
					return (
						<div className="list-product__container" key={producto._id}>
							<div className="list-product__img">IMAGEN</div>
							<div className="list-product__details">
								<h3>{producto.nombre}</h3>
								<p>Detalles: {producto.descripcion}</p>
								<span>${producto.precio}</span>
								<strong>Stock: {producto.stock}</strong>
							</div>
							<button
								className="list-button__delete"
								onClick={() => {
									console.log(producto._id);
									deleteProduct(producto._id);
								}}
							>
								X
							</button>
						</div>
					);
				})
			) : lista.error ? (
				<p>{lista.error}</p>
			) : lista.length === 0 ? (
				<p>No hay productos disponibles.</p>
			) : (
				<p>Cargando...</p>
			)}
		</div>
	);
};
