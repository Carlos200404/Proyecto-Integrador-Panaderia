import "../stylesPages/StyleContactPage.css";
import { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; 

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const notyf = new Notyf({
    position: {
      x: 'center',
      y: 'top'  
    },
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
    if (formData.nombre.length === 0 || formData.nombre.length > 50) {
      notyf.error("El nombre debe tener entre 1 y 50 caracteres.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      notyf.error("Correo electrónico inválido.");
      return false;
    }

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(formData.telefono)) {
      notyf.error("El teléfono debe tener 9 dígitos numéricos.");
      return false;
    }

    if (formData.mensaje.length === 0 || formData.mensaje.length > 500) {
      notyf.error("El mensaje debe tener entre 1 y 500 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return; 
    }

    try {
      const response = await axios.post("http://localhost:8081/api/contacto/enviar", formData);
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

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-dark">Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="nombre" className="form-label fw-bold text-dark">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="correo" className="form-label fw-bold text-dark">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            placeholder="Ingresa tu correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="telefono" className="form-label fw-bold text-dark">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="telefono"
            placeholder="Ingresa tu número de teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="mensaje" className="form-label fw-bold text-dark">Mensaje</label>
          <textarea
            className="form-control"
            id="mensaje"
            rows="4"
            placeholder="Escribe tu mensaje aquí"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn text-light btn-block" id="btn-formulario">Enviar</button>
      </form>
    </div>
  );
}
