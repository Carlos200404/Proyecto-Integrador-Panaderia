import React from "react";
import { useEffect } from "react";
const BillingDetails = ({ billingDetails, handleBillingDetailsChange }) => (
    
  
  <div>
    <h4 className="text-dark fw-bold">Información del Cliente</h4>
    <div className="mb-3">
      <label htmlFor="fullName" className="text-dark fw-bold">Nombre Completo:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        className="form-control"
        value={billingDetails.fullName}
        onChange={handleBillingDetailsChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="lastName" className="text-dark fw-bold">Apellido Completo:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        className="form-control"
        value={billingDetails.lastName}
        onChange={handleBillingDetailsChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="text-dark fw-bold">Correo Electrónico:</label>
      <input
        type="email"
        id="email"
        name="email"
        className="form-control"
        value={billingDetails.email}
        onChange={handleBillingDetailsChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="text-dark fw-bold">Teléfono:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        className="form-control"
        value={billingDetails.phone}
        onChange={handleBillingDetailsChange}
        required
      />
    </div>
  </div>
);

export default BillingDetails;
