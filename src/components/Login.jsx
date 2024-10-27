import React, { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
    duration: 3000,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuestaLogin = await axios.post("http://localhost:8081/api/auth/login", {
        correo,
        password,
      });

      const token = respuestaLogin.data;
      localStorage.setItem("token", token);

      notyf.success("Inicio de sesión exitoso");

      window.location.href = "/"; 
    } catch (error) {
      notyf.error("Correo o contraseña incorrectos");
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="correo" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
      </form>
    </div>
  );
}
