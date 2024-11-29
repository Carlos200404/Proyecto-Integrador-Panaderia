import axios from "axios";

const API_URL = "http://localhost:8081/api/categorias";

export const obtenerCategoria = async () => {
  return await axios.get(`${API_URL}/obtenerCategorias`);
};
