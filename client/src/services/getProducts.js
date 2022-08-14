const apiURL = "http://localhost:4000/api";

export const getProducts = () => {
	console.log("peticiones");
	return fetch(`${apiURL}/productos`)
		.then((res) => res.json())
		.catch(() => {
			return {error: "No se pudo acceder a la base"};
		});
};
