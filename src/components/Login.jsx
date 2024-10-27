import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "../stylesComponent/styleLogin.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
    duration: 3000,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuestaLogin = await axios.post("http://localhost:8081/api/auth/login", {
        correo,
        password,
      });
  
      const { token, nombre, apellido, correo: email, telefono } = respuestaLogin.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("correo", email);
      localStorage.setItem("telefono", telefono);
  
      notyf.success("Inicio de sesión exitoso");
  
      setTimeout(() => {
        navigate("/usuario");
        window.location.reload(); 
      }, 2000);
  
    } catch (error) {
      notyf.error("Correo o contraseña incorrectos");
      console.error("Error al iniciar sesión:", error);
    }
  };
  

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/usuario");
      }, 2000);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-container d-flex">
        <div className="image-section d-none d-md-block">
          <img src="https://proingra.com/wp-content/uploads/2023/03/23-FEB-BRAHMAN-I.jpg" alt="Example" className="login-image" />
        </div>
        
        <div className="form-section p-5">
          <h2 className="text-center mb-4 text-dark">Bienvenido</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="correo" className="form-label text-dark">Correo electrónico</label>
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
              <label htmlFor="password" className="form-label text-dark">Password</label>
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
            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
          </form>
          
          <div className="text-center mt-3">
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
