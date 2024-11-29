import axios from 'axios';

const API_URL = 'http://localhost:8081/api/pedidos';

const crearPedidoYPaymentIntent = async (pedido) => {
  try {
    // Obtener el token JWT desde las cookies
    const token = Cookies.get('jwt'); // O el método que uses para obtener el token

    // Enviar el token en el encabezado Authorization
    const response = await axios.post(`${API_URL}/crear-pedido`, pedido, {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token en la cabecera Authorization
      },
    });
    
    return response.data; // Retorna el JSON con sessionId o la respuesta del backend
  } catch (error) {
    console.error('Error al crear el pedido:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  crearPedidoYPaymentIntent,
};
