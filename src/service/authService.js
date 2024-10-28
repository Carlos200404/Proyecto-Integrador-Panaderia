// /services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

// Iniciar sesión
export const login = (correo, password) => {
  return axios.post(`${API_URL}/login`, { correo, password });
};

// Registrar nuevo usuario
export const register = (userData) => {
  return axios.post("http://localhost:8081/api/usuarios/registrar", userData, {
    headers: { "Content-Type": "application/json" },
  });
};

// Actualizar información del usuario
export const updateUser = (token, updatedUser) => {
  return axios.put(`${API_URL}/update`, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
