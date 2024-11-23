import React from "react";

const DeliveryDetails = ({ deliveryDetails, handleDeliveryDetailsChange }) => (
  <div>
    <h5 className="text-dark fw-bold">Detalles para el Delivery</h5>
    <div className="mb-3">
      <label htmlFor="pais" className="form-label text-dark fw-bold" >País:</label>
      <input
        type="text"
        id="pais"
        name="pais"
        className="form-control"
        value={deliveryDetails.pais}
        readOnly
      />
    </div>
    <div className="mb-3">
      <label htmlFor="ciudad" className="form-label text-dark fw-bold">Ciudad:</label>
      <input
        type="text"
        id="ciudad"
        name="ciudad"
        className="form-control"
        value={deliveryDetails.ciudad}
        readOnly
      />
    </div>
    <div className="mb-3">
      <label htmlFor="distrito" className="form-label text-dark fw-bold">Distrito:</label>
      <input
        type="text"
        id="distrito"
        name="distrito"
        className="form-control"
        value={deliveryDetails.distrito}
        readOnly
      />
    </div>
    <div className="mb-3">
      <label htmlFor="direccion" className="form-label text-dark fw-bold">Dirección:</label>
      <input
        type="text"
        id="direccion"
        name="direccion"
        className="form-control"
        placeholder="Ej: Calle Los Olivos 123"
        value={deliveryDetails.direccion}
        onChange={handleDeliveryDetailsChange}
        required
      />
    </div>
  </div>
);

export default DeliveryDetails;
