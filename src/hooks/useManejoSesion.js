import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { LogearUsuario } from "../service/AuntenticacionService"; 
import { esCorreoValido, esContrasenaValida } from "../utils/validaciones"; 

export const useManejoSesion = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
    duration: 3000,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!esCorreoValido(correo)) {
      notyf.error("Correo electrónico no es válido");
      return;
    }

    if (!esContrasenaValida(password)) {
      notyf.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      const respuestaLogin = await LogearUsuario(correo, password);
      const { token, id, nombre, apellido, correo: email, telefono } = respuestaLogin.data;

      // Guardar datos en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("id", id); // Guardar el ID del usuario
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("correo", email);
      localStorage.setItem("telefono", telefono);

      notyf.success("Inicio de sesión exitoso");
      setIsLoggedIn(true);

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

  return {
    correo,
    password,
    setCorreo,
    setPassword,
    handleSubmit,
  };
};
