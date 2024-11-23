import React, { useState, useEffect } from "react";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BillingDetails from "../components/BillingDetails";
import PickupDetails from "../components/PickupDetails";
import DeliveryDetails from "../components/DeliveryDetails";
import OrderSummary from "../components/OrderSummary";

const stripePromise = loadStripe("pk_test_51PTvWABzWFke1tUBiAGwKdfoTW3W4jLLQ88DvlcGGAcmB10Dj5kojMaf9r0lPi54sNv47wmdiN9hqDi29clrHDbU003qXTZU1n");

const CheckoutPage = () => {
  const [billingDetails, setBillingDetails] = useState({ fullName: "", lastName: "", email: "", phone: "" });
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [pickupDetails, setPickupDetails] = useState({ local: "", horario: "", receptor: "", dni: "" });
  const [deliveryDetails, setDeliveryDetails] = useState({ pais: "Perú", ciudad: "Ica", distrito: "Ica", direccion: "" });
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

  const handleBillingDetailsChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handlePickupDetailsChange = (event) => {
    const { name, value } = event.target;
    setPickupDetails({ ...pickupDetails, [name]: value });
  };

  const handleDeliveryDetailsChange = (event) => {
    const { name, value } = event.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado:", { billingDetails, deliveryOption, pickupDetails, deliveryDetails });
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
        ":focus": {
          color: "#424770",
        },
        "::placeholder": {
          color: "#aab7c4",
        },
        ":focus::placeholder": {
          color: "#d4d4d4",
        },
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
            <BillingDetails billingDetails={billingDetails} handleBillingDetailsChange={handleBillingDetailsChange} />
            <h5 className="mt-4 text-dark fw-bold">¿Cómo desea recibir su pedido?</h5>
            <div className="d-flex gap-3 my-3">
              <button
                type="button"
                className={`btn ${deliveryOption === "pickup" ? "btn-dark" : "btn-outline-dark"} flex-grow-1`}
                onClick={() => setDeliveryOption("pickup")}
              >
                Recoger en tienda
              </button>
              <button
                type="button"
                className={`btn ${deliveryOption === "delivery" ? "btn-dark" : "btn-outline-dark"} flex-grow-1`}
                onClick={() => setDeliveryOption("delivery")}
              >
                Delivery
              </button>
            </div>
            {deliveryOption === "pickup" && (
              <PickupDetails
                pickupDetails={pickupDetails}
                handlePickupDetailsChange={handlePickupDetailsChange}
                generateTimeOptions={generateTimeOptions}
              />
            )}
            {deliveryOption === "delivery" && (
              <DeliveryDetails deliveryDetails={deliveryDetails} handleDeliveryDetailsChange={handleDeliveryDetailsChange} />
            )}
            <h5 className="mt-4 text-dark fw-bold">Información de la tarjeta</h5>
            <div className="p-3 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
              <CardElement options={cardElementOptions} />
            </div>
            <button type="submit" className="btn btn-success mt-3 mb-5">
              Confirmar Pago
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
