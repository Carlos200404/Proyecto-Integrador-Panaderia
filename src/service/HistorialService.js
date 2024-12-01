import axios from "axios";

// Cambiar localhost por el URL de producción
const API_URL = "https://backend-integrador-production.up.railway.app/api/historial-pedidos";

// Obtener el historial de pedidos por usuario
export const obtenerHistorialPorUsuario = (idUsuario) => {
  return axios.get(`${API_URL}/usuario/${idUsuario}`);
};

// Obtener el detalle de un pedido por su ID
export const obtenerDetallePedido = (pedidoId) => {
  return axios.get(`${API_URL}/detalle/${pedidoId}`);
};
