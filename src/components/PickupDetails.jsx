import React from "react";
import { esCampoSeguro, esTextoDeLongitudValida } from "../utils/validaciones";

const PickupDetails = ({ pickupDetails, handlePickupDetailsChange, generateTimeOptions }) => {
  const validarCampo = (id, value) => {
    if (id === "receptor" && !esTextoDeLongitudValida(value, 3, 50)) {
      alert("El nombre del receptor debe tener entre 3 y 50 caracteres.");
      return false;
    }
    if (id === "dni" && !/^\d{8}$/.test(value)) {
      alert("El DNI debe contener 8 dígitos.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (validarCampo(id, value)) {
      handlePickupDetailsChange(e);
    }
  };

  return (
    <div>
      <h5 className="text-dark fw-bold fs-5">Detalles para recoger en tienda</h5>
      <div className="mb-3">
        <label htmlFor="local" className="form-label text-dark fw-bold">Elija el local para el recojo:</label>
        <select
          id="local"
          name="local"
          className="form-select"
          value={pickupDetails.local}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un local</option>
          <option value="Velazco Av Grau 199">Velazco Av Grau 199</option>
          <option value="Velazco Megaplaza">Velazco Megaplaza</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="horario" className="form-label text-dark fw-bold fs-6">Elija el horario para el recojo:</label>
        <select
          id="horario"
          name="horario"
          className="form-select"
          value={pickupDetails.horario}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un horario</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex gap-3">
        <div className="mb-3 flex-grow-1">
          <label htmlFor="receptor" className="form-label text-dark fw-bold">Nombre del receptor:</label>
          <input
            type="text"
            id="receptor"
            name="receptor"
            className="form-control"
            value={pickupDetails.receptor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="dni" className="form-label text-dark fw-bold">DNI del receptor:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            className="form-control"
            value={pickupDetails.dni}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PickupDetails;
