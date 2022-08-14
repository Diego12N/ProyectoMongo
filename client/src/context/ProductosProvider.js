import React, {useState} from "react";
import {createContext} from "react";
import {getProducts} from "../services/getProducts";

export const productosContext = createContext();

export function ProductosProvider({children}) {
	const [productsList, setProductsList] = useState([]);
	const [change, setChange] = useState(false);

	const handleList = async () => {
		if (productsList.length === 0) {
			const list = await getProducts();

			if (!list.error) {
				list.length > 0 && setProductsList(list);
				return productsList;
			} else {
				return list.error;
			}
		}
	};

	const handleObjects = (object, id) => {
		const idAssinged = {_id: id};
		productsList.push({...object, ...idAssinged});
	};

	const handleProductsChange = (boolean) => {
		setChange(boolean);
	};

	const deleteObject = (id) => {
		const newList = productsList.filter((obj) => obj._id !== id);
		setProductsList(newList);
	};

	return (
		<productosContext.Provider
			value={{
				handleList,
				productsList,
				change,
				handleProductsChange,
				handleObjects,
				deleteObject,
			}}
		>
			{children}
		</productosContext.Provider>
	);
}
