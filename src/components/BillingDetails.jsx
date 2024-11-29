import React from "react";
import { esCorreoValido, esTextoDeLongitudValida, esTelefonoValido } from "../utils/validaciones";

const BillingDetails = ({ billingDetails, handleBillingDetailsChange }) => {
  const validarCampo = (id, value) => {
    if (id === "fullName" && !esTextoDeLongitudValida(value, 3, 50)) {
      alert("El nombre completo debe tener entre 3 y 50 caracteres.");
      return false;
    }
    if (id === "email" && !esCorreoValido(value)) {
      alert("El correo electrónico no es válido.");
      return false;
    }
    if (id === "phone" && !esTelefonoValido(value)) {
      alert("El teléfono debe contener solo números.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (validarCampo(id, value)) {
      handleBillingDetailsChange(e);
    }
  };

  return (
    <div>
      <h4 className="text-dark fw-bold fs-5">Detalles de Pago</h4>
      <div className="mb-3">
        <label htmlFor="fullName" className="text-dark fw-bold fs-6">Nombre Completo:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-control"
          value={billingDetails.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="text-dark fw-bold fs-6">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={billingDetails.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="text-dark fw-bold fs-6">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="form-control"
          value={billingDetails.phone}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default BillingDetails;
