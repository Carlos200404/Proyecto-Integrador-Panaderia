import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Login from "../components/Login";
import useDatosUsuario from "../hooks/useDatosUsuario";
import { obtenerHistorialPorUsuario } from "../service/HistorialService";
import HistorialPedido from "../components/HistorialPedido"; // Importamos el componente de Historial de Pedidos
import "../stylesPages/styleUserPage.css"; // Importamos el CSS

export default function UserPage() {
  const {
    isAuthenticated,
    originalData,
    handleLogout,
  } = useDatosUsuario();

  // Estado local para manejar los valores de los campos del formulario
  const [nombreUsuario, setNombreUsuario] = useState(originalData.nombre);
  const [apellidoUsuario, setApellidoUsuario] = useState(originalData.apellido);
  const [correoUsuario, setCorreoUsuario] = useState(originalData.correo);
  const [telefonoUsuario, setTelefonoUsuario] = useState(originalData.telefono);

  // Estado para mostrar y ocultar el modal
  const [showModal, setShowModal] = useState(false);

  // Estado para manejar los datos del historial de pedidos
  const [historial, setHistorial] = useState([]);

  // Función para abrir el modal
  const openModal = () => setShowModal(true);

  // Función para cerrar el modal
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const idUsuario = localStorage.getItem("id");
    if (idUsuario) {
      obtenerHistorialPorUsuario(idUsuario)
        .then((response) => setHistorial(response.data))
        .catch((error) => console.error("Error al obtener el historial:", error));
    }
  }, []);

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <div>
          <div className="row">
            {/* Columna de contenido */}
            <div className="col-12">
              <h1 className="text-dark">
                <i className="bi bi-person-circle profile-icon"></i>
                Bienvenido, {originalData.nombre}!
              </h1>

              {/* Mostrar los datos del usuario */}
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
                      value={originalData.nombre}
                      readOnly
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
                      value={originalData.apellido}
                      readOnly
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
                      value={originalData.correo}
                      readOnly
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
                      value={originalData.telefono}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  className="btn btn-primary me-3"
                  style={{
                    width: "200px",
                    fontSize: "1rem",
                    padding: "10px 15px",
                  }}
                  onClick={openModal}
                >
                  Actualizar Datos
                </button>
                <button
                  className="btn btn-danger"
                  style={{
                    width: "200px",
                    fontSize: "1rem",
                    padding: "10px 15px",
                  }}
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
                        handleLogout(); // Llamamos a la función de cerrar sesión
                        Swal.fire(
                          "Cerraste sesión",
                          "Tu sesión ha sido cerrada exitosamente.",
                          "success"
                        );
                      }
                    });
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>

            </div>
          </div>

          {/* Modal de actualización */}
          {showModal && (
            <div
              className="modal show"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Actualizar Datos
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="nombre"
                          className="form-label modal-label"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          className="form-control"
                          value={nombreUsuario}
                          onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="apellido"
                          className="form-label modal-label"
                        >
                          Apellido
                        </label>
                        <input
                          type="text"
                          id="apellido"
                          className="form-control"
                          value={apellidoUsuario}
                          onChange={(e) => setApellidoUsuario(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="correo"
                          className="form-label modal-label"
                        >
                          Correo
                        </label>
                        <input
                          type="email"
                          id="correo"
                          className="form-control"
                          value={correoUsuario}
                          onChange={(e) => setCorreoUsuario(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="telefono"
                          className="form-label modal-label"
                        >
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          className="form-control"
                          value={telefonoUsuario}
                          onChange={(e) => setTelefonoUsuario(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary actualizar-btn"
                        style={{
                          display: "block",
                          margin: "20px auto",
                          width: "200px",
                          fontSize: "1rem",
                        }}
                      >
                        Actualizar Datos
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Mostramos el historial de pedidos */}
          <HistorialPedido historial={historial} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
