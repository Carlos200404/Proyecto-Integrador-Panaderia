import { useState } from "react";
import { enviarContacto } from "../service/ContactoService";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  esNombreValidoFormulario,
  esCorreoValidoFormulario,
  esTelefonoValidoFormulario,
  esMensajeValidoFormulario,
} from "../utils/validaciones";

export default function useFormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
    duration: 3000,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validarFormulario = () => {
    if (!esNombreValidoFormulario(formData.nombre)) {
      notyf.error("El nombre debe tener entre 1 y 50 caracteres.");
      return false;
    }
    if (!esCorreoValidoFormulario(formData.correo)) {
      notyf.error("Correo electrónico inválido.");
      return false;
    }
    if (!esTelefonoValidoFormulario(formData.telefono)) {
      notyf.error("El teléfono debe tener 9 dígitos numéricos.");
      return false;
    }
    if (!esMensajeValidoFormulario(formData.mensaje)) {
      notyf.error("El mensaje debe tener entre 1 y 500 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const response = await enviarContacto(formData);
      if (response.status === 201) {
        notyf.success("Formulario enviado con éxito");
        setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
      } else {
        notyf.error("Error al enviar el formulario");
      }
    } catch (error) {
      notyf.error("Error al enviar el formulario");
      console.error("Error:", error);
    }
  };

  return { formData, handleChange, handleSubmit };
}
