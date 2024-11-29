import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BillingDetails from "../components/BillingDetails";
import PickupDetails from "../components/PickupDetails";
import DeliveryDetails from "../components/DeliveryDetails";
import OrderSummary from "../components/OrderSummary";
import usePedido from "../hooks/usePedido";
import Swal from "sweetalert2";

const stripePromise = loadStripe("pk_test_51PTvWABzWFke1tUBiAGwKdfoTW3W4jLLQ88DvlcGGAcmB10Dj5kojMaf9r0lPi54sNv47wmdiN9hqDi29clrHDbU003qXTZU1n");

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { registrarPedido, loading } = usePedido();
  const navigate = useNavigate();

  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    postalCode: "", // Agregado el código postal
  });
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [pickupDetails, setPickupDetails] = useState({
    local: "",
    horario: "",
    receptor: "",
    dni: "",
  });
  const [deliveryDetails, setDeliveryDetails] = useState({
    pais: "Perú",
    ciudad: "Ica",
    distrito: "Ica",
    direccion: "",
    referencia: "",
    telefonoContacto: "",
  });
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

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

    if (!stripe || !elements) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Stripe no está cargado correctamente.",
      });
      return;
    }

    if (!deliveryOption) {
      Swal.fire({
        icon: "warning",
        title: "Opción de entrega no seleccionada",
        text: "Por favor, selecciona cómo deseas recibir tu pedido.",
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: billingDetails.fullName,
        email: billingDetails.email,
        address: {
          postal_code: billingDetails.postalCode,
        },
      },
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error de pago",
        text: error.message,
      });
      return;
    }

    console.log("PaymentMethod creado:", paymentMethod);

    const codigoPostal = paymentMethod.billing_details?.address?.postal_code || "";
    if (!codigoPostal) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El código postal es obligatorio.",
      });
      return;
    }

    try {
      // Enviar los datos al backend
      await registrarPedido(
        deliveryOption,
        billingDetails,
        { ...deliveryDetails, codigoPostal },
        pickupDetails
      );

      Swal.fire({
        icon: "success",
        title: "Pedido completado",
        text: "Tu pedido se ha realizado con éxito.",
      });

      // Redirigir a la página principal
      navigate("/");
    } catch (err) {
      console.error("Error al registrar el pedido:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al procesar tu pedido. Por favor, intenta nuevamente.",
      });
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
    hidePostalCode: false, // Mostrar el campo de código postal
  };

  const generateTimeOptions = () =>
    Array.from({ length: 12 }, (_, i) => `${8 + i}:00 - ${9 + i}:00`);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <BillingDetails
              billingDetails={billingDetails}
              handleBillingDetailsChange={(e) =>
                setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value })
              }
            />
            <h5 className="mt-4 text-dark fw-bold">¿Cómo desea recibir su pedido?</h5>
            <div className="d-flex gap-3 my-3">
              <button
                type="button"
                className={`btn ${
                  deliveryOption === "pickup" ? "btn-dark" : "btn-outline-dark"
                } flex-grow-1`}
                onClick={() => setDeliveryOption("pickup")}
              >
                Recoger en tienda
              </button>
              <button
                type="button"
                className={`btn ${
                  deliveryOption === "delivery" ? "btn-dark" : "btn-outline-dark"
                } flex-grow-1`}
                onClick={() => setDeliveryOption("delivery")}
              >
                Delivery
              </button>
            </div>
            {deliveryOption === "pickup" && (
              <PickupDetails
                pickupDetails={pickupDetails}
                handlePickupDetailsChange={(e) =>
                  setPickupDetails({ ...pickupDetails, [e.target.name]: e.target.value })
                }
                generateTimeOptions={generateTimeOptions}
              />
            )}
            {deliveryOption === "delivery" && (
              <DeliveryDetails
                deliveryDetails={deliveryDetails}
                handleDeliveryDetailsChange={(e) =>
                  setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value })
                }
              />
            )}
            <h5 className="mt-4 text-dark fw-bold">Información de la tarjeta</h5>
            <div className="p-3 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
              <CardElement options={cardElementOptions} />
            </div>
            <button
              type="submit"
              className="btn btn-success mt-3 mb-5"
              disabled={!stripe || loading}
            >
              {loading ? "Procesando..." : "Confirmar Pedido"}
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
