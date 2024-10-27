import React, { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesComponent/styleRegister.css";

export default function Register() {
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
    position: { x: "center", y: "top" },
  });

  const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name); 
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]+$/.test(phone); 
  const isValidPassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          headers: { "Content-Type": "application/json" },
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
    <div className="register-wrapper d-flex align-items-center justify-content-center text-dark">
      <div className="register-container d-flex">
        <div className="image-section d-none d-md-block">
          <img src="https://proingra.com/wp-content/uploads/2023/03/23-FEB-BRAHMAN-I.jpg" alt="Example" className="register-image" />
        </div>
        
        <div className="form-section p-5">
          <h2 className="text-center mb-4 text-dark">Crear Cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="row ">
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Primer Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={primerNombre}
                  onChange={(e) => setPrimerNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Segundo Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={segundoNombre}
                  onChange={(e) => setSegundoNombre(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Primer Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  value={primerApellido}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-dark">Segundo Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  value={segundoApellido}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Teléfono:</label>
              <input
                type="tel"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  );
}
