import React from "react";
import { Link } from "react-router-dom";
import "../stylesComponent/styleLogin.css";
import { useManejoSesion } from "../hooks/useManejoSesion"; 

export default function Login() {
  const { correo, password, setCorreo, setPassword, handleSubmit } = useManejoSesion();

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
