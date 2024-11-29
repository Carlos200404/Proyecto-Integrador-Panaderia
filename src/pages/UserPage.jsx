import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import Login from "../components/Login";
import HistorialPedido from "../components/HistorialPedido";
import { AuthContext } from "../context/AuthContext";
import "../stylesPages/styleUserPage.css";

export default function UserPage() {
  const { isAuthenticated, userData, historial, handleLogout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false); // Manejamos el modal localmente
  const [formState, setFormState] = useState({
    nombre: userData.nombre || "",
    apellido: userData.apellido || "",
    correo: userData.correo || "",
    telefono: userData.telefono || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire("¡Datos actualizados!", "Tu información ha sido guardada.", "success");
    setShowModal(false);
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="container mt-5">
      <div>
        <h1 className="text-dark">
          <i className="bi bi-person-circle profile-icon"></i>
          Bienvenido, {userData.nombre}!
        </h1>
        <div className="mt-4">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">
                <strong>Nombre:</strong>
              </label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                value={formState.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="apellido" className="form-label">
                <strong>Apellido:</strong>
              </label>
              <input
                type="text"
                id="apellido"
                className="form-control"
                value={formState.apellido}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="correo" className="form-label">
                <strong>Correo:</strong>
              </label>
              <input
                type="email"
                id="correo"
                className="form-control"
                value={formState.correo}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="telefono" className="form-label">
                <strong>Teléfono:</strong>
              </label>
              <input
                type="tel"
                id="telefono"
                className="form-control"
                value={formState.telefono}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary me-3"
            onClick={() => setShowModal(true)}
          >
            Actualizar Datos
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Quieres cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleLogout();
                  Swal.fire("Cerraste sesión", "Tu sesión ha sido cerrada exitosamente.", "success");
                }
              });
            }}
          >
            Cerrar Sesión
          </button>
        </div>
        {showModal && (
          <div className="modal show" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Actualizar Datos</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {/* Formulario */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <HistorialPedido historial={historial} />
      </div>
    </div>
  );
}
