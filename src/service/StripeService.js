import axios from 'axios';

const API_URL = 'http://localhost:8081/api/stripe';

const crearPaymentIntent = (monto, moneda) => {
    return axios.post(`${API_URL}/create-payment-intent`, {
        amount: monto,
        currency: moneda,
    });
};

const confirmarPago = (pedidoId, paymentDetails) => {
    return axios.post(`${API_URL}/confirm-payment/${pedidoId}`, paymentDetails);
};

export default {
    crearPaymentIntent,
    confirmarPago,
};
