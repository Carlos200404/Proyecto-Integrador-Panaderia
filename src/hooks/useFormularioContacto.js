import { useState } from "react";
import { enviarContacto } from "../service/ContactoService";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  esNombreValidoFormulario,
  esCorreoValidoFormulario,
  esTelefonoValidoFormulario,
  esMensajeValidoFormulario,
  esTextoSeguro,
  esCampoSeguro,
  escaparHTML,
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
    const valorSanitizado = escaparHTML(value); 
    setFormData((prevData) => ({
      ...prevData,
      [id]: valorSanitizado,
    }));
  };

  const validarFormulario = () => {
    if (!esNombreValidoFormulario(formData.nombre) || !esCampoSeguro(formData.nombre)) {
      notyf.error("El nombre contiene caracteres inválidos o supera el límite permitido.");
      return false;
    }
    if (!esCorreoValidoFormulario(formData.correo)) {
      notyf.error("Correo electrónico inválido.");
      return false;
    }
    if (!esTelefonoValidoFormulario(formData.telefono) || !esCampoSeguro(formData.telefono)) {
      notyf.error("El teléfono contiene caracteres inválidos.");
      return false;
    }
    if (!esMensajeValidoFormulario(formData.mensaje) || !esTextoSeguro(formData.mensaje)) {
      notyf.error("El mensaje contiene caracteres peligrosos o excede el límite permitido.");
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
