import axios from "axios";

const API_URL = 'http://localhost:8081/api/categorias';

export const obtenerCategoria = (formData) => {
    return axios.get(`${API_URL}`);
  };
  