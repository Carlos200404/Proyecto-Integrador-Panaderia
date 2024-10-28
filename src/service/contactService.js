// /services/contactService.js
import axios from "axios";

const CONTACT_API_URL = "http://localhost:8081/api/contacto";

// Enviar formulario de contacto
export const sendContactForm = (formData) => {
  return axios.post(`${CONTACT_API_URL}/enviar`, formData);
};
