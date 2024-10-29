import axios from 'axios';

const API_URL = 'http://localhost:8081/api/productos';

const obtenerTodosLosProductos = () => {
    return axios.get(`${API_URL}/listarProductos`);
};

const obtenerProductosDestacados = () => {
    return axios.get(`${API_URL}/masVendidos`);
};

const obtenerProductoPorId = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export default {
    obtenerTodosLosProductos,
    obtenerProductosDestacados,
    obtenerProductoPorId,
};
