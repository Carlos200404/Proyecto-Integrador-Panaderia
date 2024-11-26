import React, { useState, useEffect } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BillingDetails from "../components/BillingDetails";
import PickupDetails from "../components/PickupDetails";
import DeliveryDetails from "../components/DeliveryDetails";
import OrderSummary from "../components/OrderSummary";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51PTvWABzWFke1tUBiAGwKdfoTW3W4jLLQ88DvlcGGAcmB10Dj5kojMaf9r0lPi54sNv47wmdiN9hqDi29clrHDbU003qXTZU1n");

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [billingDetails, setBillingDetails] = useState({ fullName: "", email: "", phone: "" });
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [pickupDetails, setPickupDetails] = useState({ local: "", horario: "", receptor: "", dni: "" });
  const [deliveryDetails, setDeliveryDetails] = useState({ pais: "Perú", ciudad: "Ica", distrito: "Ica", direccion: "" });
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cartData = JSON.parse(localStorage.getItem("carrito")) || [];
      setCart(cartData);
      const total = cartData.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      setSubtotal(total);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Obtén el CardElement desde los elementos de Stripe
      const cardElement = elements.getElement(CardElement);

      if (!stripe || !cardElement) {
        console.error("Stripe no está cargado o el elemento de la tarjeta no está disponible.");
        alert("Hubo un problema con el método de pago. Intenta nuevamente.");
        setLoading(false);
        return;
      }

      // Crear el pedido y enviarlo al backend
      const pedido = {
        usuario: { id: 2 }, // Ajusta el ID de usuario según tu lógica
        fecha: new Date().toISOString().split("T")[0],
        direccion: deliveryOption === "delivery" ? { ...deliveryDetails, codigoPostal: "11001" } : null,
        estado: "Pendiente",
        pedidoProductos: cart.map((item) => ({
          producto: { id: item.id },
          cantidad: item.cantidad,
        })),
      };

      // Enviar el pedido al backend para crear el PaymentIntent
      const { data } = await axios.post("http://localhost:8081/api/pedidos/crear-payment-intent", pedido);

      // Confirmar el pago usando el clientSecret retornado
      const { clientSecret } = data;
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: billingDetails.fullName,
            email: billingDetails.email,
            phone: billingDetails.phone,
            address: {
              line1: deliveryDetails.direccion || "N/A",
              city: deliveryDetails.ciudad || "N/A",
              country: "PE",
              postal_code: "11001",
            },
          },
        },
      });

      if (error) {
        console.error("Error al confirmar el pago:", error.message);
        alert("Hubo un error al procesar el pago. Intenta nuevamente.");
        setLoading(false);
        return;
      }

      // Verificar el estado del PaymentIntent
      if (paymentIntent.status === "succeeded") {
        alert("¡Pago realizado con éxito!");
      } else {
        alert("El pago no fue completado. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al procesar el pedido:", error.message);
      alert("Hubo un problema al procesar tu pedido. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        fontWeight: "400",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const generateTimeOptions = () => Array.from({ length: 12 }, (_, i) => `${8 + i}:00 - ${9 + i}:00`);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <BillingDetails billingDetails={billingDetails} handleBillingDetailsChange={(e) => setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value })} />
            <h5 className="mt-4 text-dark fw-bold">¿Cómo desea recibir su pedido?</h5>
            <div className="d-flex gap-3 my-3">
              <button type="button" className={`btn ${deliveryOption === "pickup" ? "btn-dark" : "btn-outline-dark"} flex-grow-1`} onClick={() => setDeliveryOption("pickup")}>
                Recoger en tienda
              </button>
              <button type="button" className={`btn ${deliveryOption === "delivery" ? "btn-dark" : "btn-outline-dark"} flex-grow-1`} onClick={() => setDeliveryOption("delivery")}>
                Delivery
              </button>
            </div>
            {deliveryOption === "pickup" && <PickupDetails pickupDetails={pickupDetails} handlePickupDetailsChange={(e) => setPickupDetails({ ...pickupDetails, [e.target.name]: e.target.value })} generateTimeOptions={generateTimeOptions} />}
            {deliveryOption === "delivery" && <DeliveryDetails deliveryDetails={deliveryDetails} handleDeliveryDetailsChange={(e) => setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value })} />}
            <h5 className="mt-4 text-dark fw-bold">Información de la tarjeta</h5>
            <div className="p-3 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
              <CardElement options={cardElementOptions} />
            </div>
            <button type="submit" className="btn btn-success mt-3 mb-5" disabled={!stripe || loading}>
              {loading ? "Procesando..." : "Confirmar Pago"}
            </button>
          </div>
          <div className="col-md-6">
            <OrderSummary cart={cart} subtotal={subtotal} />
          </div>
        </div>
      </form>
    </div>
  );
};

const WrapperCheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default WrapperCheckoutPage;
