import React, { useState } from "react";
import axios from "axios";

export default function UserPage() {
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rolId] = useState(2); // Asignando por defecto el rol ID 2

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombre = `${primerNombre} ${segundoNombre}`;
    const apellido = `${primerApellido} ${segundoApellido}`;

    // Datos a enviar al backend
    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      telefono,
      password: contrasena,
      rol: { id: rolId }, // Esto es necesario si `rol` es un objeto en el backend
    };

    try {
      const respuesta = await axios.post(
        "http://localhost:8081/api/usuarios/registrar",
        nuevoUsuario,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Usuario registrado:", respuesta.data);
      alert("Usuario registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario");
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Primer Nombre:</label>
          <input
            type="text"
            value={primerNombre}
            onChange={(e) => setPrimerNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Segundo Nombre:</label>
          <input
            type="text"
            value={segundoNombre}
            onChange={(e) => setSegundoNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Primer Apellido:</label>
          <input
            type="text"
            value={primerApellido}
            onChange={(e) => setPrimerApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Segundo Apellido:</label>
          <input
            type="text"
            value={segundoApellido}
            onChange={(e) => setSegundoApellido(e.target.value)}
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar Usuario</button>
      </form>
    </div>
  );
}
