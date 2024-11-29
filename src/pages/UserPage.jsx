import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import useDatosUsuario from "../hooks/useDatosUsuario";
import { obtenerHistorialPorUsuario } from "../service/HistorialService";

export default function UserPage() {
  const {
    isAuthenticated,
    originalData,
    handleLogout,
    handleUpdate,
    error,
    nombreUsuario,
    setNombreUsuario,
    apellidoUsuario,
    setApellidoUsuario,
    correoUsuario,
    setCorreoUsuario,
    telefonoUsuario,
    setTelefonoUsuario,
    nuevaContrasena,
    setNuevaContrasena,
  } = useDatosUsuario();

  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const idUsuario = localStorage.getItem("id"); // Cambiado a "id"
    if (idUsuario) {
      obtenerHistorialPorUsuario(idUsuario)
        .then((response) => setHistorial(response.data))
        .catch((error) => console.error("Error al obtener el historial:", error));
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>
            Bienvenido, {originalData.nombre} {originalData.apellido}
          </h2>
          <p>Correo: {originalData.correo}</p>
          <p>Teléfono: {originalData.telefono}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>

          <h3>Historial de Pedidos</h3>
          {historial.length > 0 ? (
            <ul>
              {historial.map((pedido) => (
                <li key={pedido.id}>
                  <p>
                    <strong>Producto:</strong> {pedido.nombreProducto}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {pedido.cantidad}
                  </p>
                  <p>
                    <strong>Subtotal:</strong> S/ {pedido.subtotal}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {pedido.fecha}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes pedidos en tu historial.</p>
          )}

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
