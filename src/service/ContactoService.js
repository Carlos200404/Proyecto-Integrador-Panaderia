import axios from "axios";

const CONTACT_API_URL = "http://localhost:8081/api/contacto";

export const enviarContacto = (formData) => {
  return axios.post(`${CONTACT_API_URL}/enviar`, formData);
};
