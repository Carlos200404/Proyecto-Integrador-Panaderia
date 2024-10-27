import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import axios from "axios";

export default function UserPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [error, setError] = useState("");

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");
    const correo = localStorage.getItem("correo");
    const telefono = localStorage.getItem("telefono");

    if (token && nombre) {
      setIsAuthenticated(true);
      setNombreUsuario(nombre);
      setApellidoUsuario(apellido);
      setCorreoUsuario(correo);
      setTelefonoUsuario(telefono);
      setOriginalData({ nombre, apellido, correo, telefono }); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apellido");
    localStorage.removeItem("correo");
    localStorage.removeItem("telefono");
    setIsAuthenticated(false);
    setNombreUsuario("");
    setApellidoUsuario("");
    setCorreoUsuario("");
    setTelefonoUsuario("");
    setOriginalData({});
    window.location.reload();
  };

  const validateForm = () => {
    if (nombreUsuario.length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return false;
    }
    if (apellidoUsuario.length < 2) {
      setError("El apellido debe tener al menos 2 caracteres");
      return false;
    }
    const emailPattern = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if (!emailPattern.test(correoUsuario)) {
      setError("El correo electrónico no tiene un formato válido");
      return false;
    }
    if (nuevaContrasena && nuevaContrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const updatedUser = {
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        correo: correoUsuario,
        telefono: telefonoUsuario,
        password: nuevaContrasena || undefined, 
      };

      const response = await axios.put("http://localhost:8081/api/auth/update", updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("nombre", nombreUsuario);
      localStorage.setItem("apellido", apellidoUsuario);
      localStorage.setItem("correo", correoUsuario);
      localStorage.setItem("telefono", telefonoUsuario);

      alert("Datos actualizados exitosamente");
      setOriginalData({ nombre: nombreUsuario, apellido: apellidoUsuario, correo: correoUsuario, telefono: telefonoUsuario });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Hubo un problema al actualizar los datos");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Bienvenido, {originalData.nombre} {originalData.apellido}</h2>
          <p>Correo: {originalData.correo}</p>
          <p>Teléfono: {originalData.telefono}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>

          <h3>Actualizar Datos</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleUpdate}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
            <div>
              <label>Apellido:</label>
              <input
                type="text"
                value={apellidoUsuario}
                onChange={(e) => setApellidoUsuario(e.target.value)}
              />
            </div>
            <div>
              <label>Correo:</label>
              <input
                type="email"
                value={correoUsuario}
                onChange={(e) => setCorreoUsuario(e.target.value)}
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                type="tel"
                value={telefonoUsuario}
                onChange={(e) => setTelefonoUsuario(e.target.value)}
              />
            </div>
            <div>
              <label>Nueva Contraseña:</label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
              />
            </div>
            <button type="submit">Actualizar Datos</button>
          </form>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
