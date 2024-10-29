import React from "react";
import Login from "../components/Login";
import useDatosUsuario from "../hooks/useDatosUsuario";

export default function UserPage() {
  const {
    isAuthenticated,
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
    originalData,
    handleLogout,
    handleUpdate,
    error,
  } = useDatosUsuario();

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
