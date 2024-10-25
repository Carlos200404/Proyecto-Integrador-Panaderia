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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/contacto/enviar", formData);
      if (response.status === 201) {
        notyf.success("Formulario enviado con éxito"); // Notificación de éxito
        setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
      } else {
        notyf.error("Error al enviar el formulario"); // Notificación de error
      }
    } catch (error) {
      notyf.error("Error al enviar el formulario"); // Notificación de error
      console.error("Error:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
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
          <label htmlFor="correo" className="form-label fw-bold">Correo Electrónico</label>
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
          <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
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
          <label htmlFor="mensaje" className="form-label fw-bold">Mensaje</label>
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
