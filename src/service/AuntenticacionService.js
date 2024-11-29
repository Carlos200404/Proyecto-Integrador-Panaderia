import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const LogearUsuario = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password }); // Corrección de comillas invertidas
};

export const RegistrarUsuario = (userData) => {
  return axios.post("http://localhost:8081/api/usuarios/registrar", userData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const ActualizarUsuario = (token, updatedUser) => {
  return axios.put(`${API_URL}/update`, updatedUser, { // Corrección de comillas invertidas
    headers: {
      Authorization: `Bearer ${token}`, // Corrección de comillas y formato
      "Content-Type": "application/json",
    },
  });
};
