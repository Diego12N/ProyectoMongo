import React, {useState} from "react";
import "./App.css";
import {ProductForm} from "./components/formulario";
import {ListaProductos} from "./components/listaDeProductos";
import {ProductosProvider} from "./context/ProductosProvider";
/* import io from "socket.io-client";

const socket = io("http://localhost:4000/");
 */

function App() {
	/* const [add, setAdd] = useState({});

	const updateList = (event) => {
		setAdd({...event});
	};
 */
	return (
		<ProductosProvider>
			<div className="App">
				<ProductForm />
				<ListaProductos />
			</div>
		</ProductosProvider>
	);
}

export default App;
