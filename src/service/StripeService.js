import axios from 'axios';

const API_URL = 'http://localhost:8081/api/pedidos';

const crearPedidoYPaymentIntent = async (pedido) => {
  try {
    const response = await axios.post(`${API_URL}/crear-pedido`, pedido);
    return response.data; // Retorna el JSON con sessionId
  } catch (error) {
    console.error('Error al crear el pedido:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  crearPedidoYPaymentIntent,
};
