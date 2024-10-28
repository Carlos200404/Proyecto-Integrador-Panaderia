// /services/productService.js
import axios from "axios";

const PRODUCT_API_URL = "http://localhost:8081/api/productos";
const CATEGORY_API_URL = "http://localhost:8081/api/categorias";

// Obtener todos los productos
export const getProducts = () => {
  return axios.get(`${PRODUCT_API_URL}/listarProductos`);
};

// Obtener todas las categorías
export const getCategories = () => {
  return axios.get(CATEGORY_API_URL);
};
