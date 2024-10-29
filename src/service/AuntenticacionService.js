import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const LogearUsuario = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password });
};

export const RegistrarUsuario = (userData) => {
  return axios.post("http://localhost:8081/api/usuarios/registrar", userData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const ActualizarUsuario = (token, updatedUser) => {
  return axios.put(`${API_URL}/update`, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
