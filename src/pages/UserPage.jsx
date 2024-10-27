import React, { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function UserPage() {
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rolId] = useState(2);

  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
    position: {
      x: 'center',
      y: 'top',
    },
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombre = `${primerNombre} ${segundoNombre}`;
    const apellido = `${primerApellido} ${segundoApellido}`;

    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      telefono,
      password: contrasena,
      rol: { id: rolId },
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
      notyf.success("Usuario registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      notyf.error("Error al registrar el usuario");
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
