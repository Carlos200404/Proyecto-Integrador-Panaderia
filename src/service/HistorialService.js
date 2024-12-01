import axios from "axios";

const API_URL = "http://localhost:8081/api/historial-pedidos";

// Obtener el historial de pedidos por usuario
export const obtenerHistorialPorUsuario = (idUsuario) => {
  return axios.get(`${API_URL}/usuario/${idUsuario}`);
};

// Obtener el detalle de un pedido por su ID
export const obtenerDetallePedido = (pedidoId) => {
  return axios.get(`${API_URL}/detalle/${pedidoId}`);
};
