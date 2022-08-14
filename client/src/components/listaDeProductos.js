import React, {useContext, useEffect, useRef, useState} from "react";
import {Productos} from "./productos";
import {productosContext} from "../context/ProductosProvider";

export const ListaProductos = (props) => {
	/* 	const [productos, setProductos] = useState([]); */
	const [updated, setUpdated] = useState(false);
	const shouldCall = useRef(true);
	const context = useContext(productosContext);
	const list = context.productsList;
	const change = context.change;

	const deleteProducts = (change) => {
		setUpdated(change);
	};

	useEffect(() => {
		console.log("UseEffect");
		if (shouldCall.current) {
			context.handleList();
			shouldCall.current = false;
		}

		context.handleProductsChange(false);
		setUpdated(false);
	}, [updated, change]);

	return (
		<div className="list">
			<Productos list={list} delete={deleteProducts}></Productos>
		</div>
	);
};
