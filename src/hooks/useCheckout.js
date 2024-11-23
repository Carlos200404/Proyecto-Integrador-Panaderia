import { useState, useContext } from "react";
import StripeService from "../service/StripeService";
import { CarritoContext } from "../context/CarritoContext";

const useCheckout = () => {
    const { carrito, vaciarCarrito } = useContext(CarritoContext);
    const [clientSecret, setClientSecret] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Calcula el total del carrito
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    };

    // Inicia el proceso de pago creando un Payment Intent en el backend
    const iniciarPago = async () => {
        setIsLoading(true);
        try {
            const total = calcularTotal();
            const response = await StripeService.createPaymentIntent(total, "PEN");
            setClientSecret(response.clientSecret); // Asegúrate de que el backend envíe el clientSecret en el JSON
        } catch (error) {
            console.error("Error al iniciar el pago:", error);
            alert("Error al iniciar el pago. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    // Maneja el proceso de pago utilizando Stripe
    const manejarPago = async (billingDetails) => {
        const stripe = StripeService.getStripeInstance(); // Asegúrate de implementar esta función en StripeService
        if (!stripe || !clientSecret) {
            console.error("Stripe no está configurado correctamente.");
            return null;
        }

        try {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: StripeService.getCardElement(), // Obtener el elemento de la tarjeta
                    billing_details: {
                        name: billingDetails.name,
                        email: billingDetails.email,
                    },
                },
            });

            if (result.error) {
                console.error("Error en el pago:", result.error.message);
                alert("Error en el pago: " + result.error.message);
                return null;
            }

            // Pago exitoso
            return result.paymentIntent;
        } catch (error) {
            console.error("Error durante el pago:", error);
            alert("Error durante el proceso de pago. Intenta nuevamente.");
            return null;
        }
    };

    // Registra el pedido en el backend
    const registrarPedido = async (paymentIntentId, deliveryInfo) => {
        try {
            const productos = carrito.map((producto) => ({
                productoId: producto.id,
                cantidad: producto.cantidad,
                subtotal: producto.precio * producto.cantidad,
            }));

            const pedido = {
                paymentIntentId,
                productos,
                deliveryInfo,
                total: calcularTotal(),
            };

            const response = await StripeService.createOrder(pedido);

            if (response.success) {
                alert("Pedido registrado exitosamente.");
                vaciarCarrito();
            } else {
                console.error("Error al registrar el pedido:", response.message);
                alert("No se pudo registrar el pedido.");
            }
        } catch (error) {
            console.error("Error al registrar el pedido:", error);
            alert("Error al registrar el pedido.");
        }
    };

    return {
        clientSecret,
        isLoading,
        calcularTotal,
        iniciarPago,
        manejarPago,
        registrarPedido,
    };
};

export default useCheckout;
