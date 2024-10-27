import React, { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Login from "../components/Login";

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
      x: "center",
      y: "top",
    },
  });

  // Funciones de validación
  const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name); // Solo letras y espacios
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]+$/.test(phone); // Solo dígitos
  const isValidPassword = (password) => password.length >= 8; // Longitud mínima de 8 caracteres

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos antes de enviar
    if (!isValidName(primerNombre) || !isValidName(primerApellido)) {
      notyf.error("Los nombres y apellidos deben contener solo letras y espacios");
      return;
    }

    if (!isValidEmail(correo)) {
      notyf.error("Correo electrónico no es válido");
      return;
    }

    if (telefono && !isValidPhone(telefono)) {
      notyf.error("El número de teléfono debe contener solo dígitos");
      return;
    }

    if (!isValidPassword(contrasena)) {
      notyf.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

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
      if (
        error.response &&
        error.response.data === "El correo electrónico ya está registrado"
      ) {
        notyf.error("El correo electrónico ya existe en la base de datos");
      } else {
        notyf.error("Error al registrar el usuario");
      }
    }
  };

  return (
    <>
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
      <Login />
    </>
  );
}
