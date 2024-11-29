import React from "react";

const PickupDetails = ({ pickupDetails, handlePickupDetailsChange, generateTimeOptions }) => (
  <div>
    <h5 className="text-dark fw-bold fs-5">Detalles para recoger en tienda</h5>
    <div className="mb-3">
      <label htmlFor="local" className="form-label text-dark fw-bold">Elija el local para el recojo:</label>
      <select
        id="local"
        name="local"
        className="form-select"
        value={pickupDetails.local}
        onChange={handlePickupDetailsChange}
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
        onChange={handlePickupDetailsChange}
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
          onChange={handlePickupDetailsChange}
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
          onChange={handlePickupDetailsChange}
          required
        />

      </div>
    </div>
  </div>
);

export default PickupDetails;
