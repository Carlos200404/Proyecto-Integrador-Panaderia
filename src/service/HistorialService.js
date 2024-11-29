import axios from "axios";

const API_URL = "http://localhost:8081/api/historial-pedidos";

export const obtenerHistorialPorUsuario = (idUsuario) => {
  return axios.get(`${API_URL}/usuario/${idUsuario}`);
};
