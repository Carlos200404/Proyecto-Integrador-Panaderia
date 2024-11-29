import { useState, useEffect } from "react";
import { ActualizarUsuario } from "../service/AuntenticacionService";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function useDatosUsuario() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [error, setError] = useState("");
  const [originalData, setOriginalData] = useState({});

  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
    position: { x: "center", y: "top" },
  });

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

  const handleUpdate = async () => {
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

      await ActualizarUsuario(token, updatedUser);
      localStorage.setItem("nombre", nombreUsuario);
      localStorage.setItem("apellido", apellidoUsuario);
      localStorage.setItem("correo", correoUsuario);
      localStorage.setItem("telefono", telefonoUsuario);

      notyf.success("Datos actualizados exitosamente");
      setOriginalData({ nombre: nombreUsuario, apellido: apellidoUsuario, correo: correoUsuario, telefono: telefonoUsuario });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      notyf.error("Hubo un problema al actualizar los datos");
    }
  };

  return {
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
  };
}