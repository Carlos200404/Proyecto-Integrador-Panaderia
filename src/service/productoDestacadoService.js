import axios from 'axios';

const API_URL = 'http://localhost:8081/api/productos';

const obtenerProductosDestacados = () => {
    return axios.get(`${API_URL}/masVendidos`);
};

export default {
    obtenerProductosDestacados,
};
