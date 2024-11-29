import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CarritoContext } from "../context/CarritoContext";

const usePedido = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const [loading, setLoading] = useState(false);

  const registrarPedido = async (deliveryOption, billingDetails, deliveryDetails, pickupDetails) => {
    setLoading(true);
    try {
      // Obtener el ID del usuario desde localStorage
      const userId = localStorage.getItem("id");
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró un usuario autenticado. Inicia sesión nuevamente.",
        });
        setLoading(false);
        return;
      }

      // Obtener los productos del carrito
      const carritoData = JSON.parse(localStorage.getItem("carrito")) || [];
      if (carritoData.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Carrito vacío",
          text: "No hay productos en el carrito para realizar un pedido.",
        });
        setLoading(false);
        return;
      }

      // Construir los productos en el formato requerido
      const productos = carritoData.map((item) => ({
        producto: { id: item.id },
        cantidad: item.cantidad,
      }));

      // Crear el pedido en base al formato solicitado
      const pedido = {
        pedido: {
          usuario: { id: parseInt(userId) },
          fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
          estado: "Pendiente",
          ...(deliveryOption === "delivery"
            ? { direccion: { ...deliveryDetails } }
            : {}),
        },
        productos,
        recojoTienda:
          deliveryOption === "pickup"
            ? {
              local: pickupDetails.local,
              horario: pickupDetails.horario,
              receptorNombre: pickupDetails.receptor,
              receptorDni: pickupDetails.dni,
            }
            : null,
      };

      console.log("Pedido final a enviar:", pedido); // Verificar estructura del pedido

      // Enviar el pedido al backend
      const response = await axios.post("http://localhost:8081/api/pedidos/crear-pedido", pedido, {
        withCredentials: true,
      });

      console.log("Respuesta del backend:", response.data);

      Swal.fire({
        icon: "success",
        title: "¡Pedido realizado con éxito!",
        text: "Estamos procesando tu pedido.",
      });

      // Limpiar el carrito
      localStorage.removeItem("carrito");
      vaciarCarrito();
      return response.data;
    } catch (error) {
      console.error("Error al procesar el pedido:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error al procesar el pedido",
        text: error.response?.data?.message || "Hubo un problema inesperado.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    registrarPedido,
    loading,
  };
};

export default usePedido;
