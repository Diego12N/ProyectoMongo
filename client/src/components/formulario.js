import React, {useContext} from "react";
import {useState} from "react";
import {productosContext} from "../context/ProductosProvider";

const apiURL = "http://localhost:4000/api";

export const ProductForm = (props) => {
	const [form, setForm] = useState({});
	const context = useContext(productosContext);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const clearForm = () => {
		const clearInputs = Object.entries(form).map(([key]) => [key, ""]);
		const cleanForm = Object.fromEntries(clearInputs);

		setForm(cleanForm);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(form),
		};

		let idNewProduct = await fetch(`${apiURL}/productos`, requestOptions)
			.then((res) => res.json())
			.then((data) => {
				return data;
			});

		context.handleObjects(form, idNewProduct);
		context.handleProductsChange(true);
		clearForm();
	};

	return (
		<form action="" method="post" className="form" onSubmit={handleSubmit}>
			<label className="form-input_title">Ingrese nombre del producto</label>
			<input
				className="form-input"
				type="text"
				name="nombre"
				value={form.nombre || ""}
				onChange={handleChange}
			/>
			<label className="form-input_title">
				Ingrese descripcion del producto
			</label>
			<input
				className="form-input"
				type="text"
				name="descripcion"
				value={form.descripcion || ""}
				onChange={handleChange}
			/>
			<label className="form-input_title">Ingrese codigo del producto</label>
			<input
				className="form-input"
				type="number"
				name="codigo"
				min={0}
				value={form.codigo || ""}
				onChange={handleChange}
			/>
			<label className="form-input_title">Ingrese precio del producto</label>
			<input
				className="form-input"
				type="number"
				name="precio"
				min={0}
				value={form.precio || ""}
				onChange={handleChange}
			/>
			<label className="form-input_title">Ingrese foto del producto</label>
			<input
				className="form-input"
				type="text"
				name="foto"
				value={form.foto || ""}
				onChange={handleChange}
			/>
			<label className="form-input_title">Ingrese stock del producto</label>
			<input
				className="form-input"
				type="number"
				name="stock"
				min={0}
				value={form.stock || ""}
				onChange={handleChange}
			/>
			<button className="form-btn">Enviar</button>
			<button type="button" onClick={clearForm}>
				Limpiar Formulario
			</button>
		</form>
	);
};
