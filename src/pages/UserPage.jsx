import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"; 
import HistorialPedido from "../components/HistorialPedido";
import Login from "../components/Login";

import Swal from "sweetalert2";
import "../stylesPages/styleUserPage.css";

export default function UserPage() {
  
  const { isAuthenticated, userData, historial, handleLogout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    nombre: userData.nombre || "",
    apellido: userData.apellido || "",
    correo: userData.correo || "",
    telefono: userData.telefono || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  if (!isAuthenticated) {
    return <Login />;
  }

  const handleSaveChanges = () => {
    if (!editData.nombre || !editData.apellido || !editData.correo || !editData.telefono) {
      Swal.fire("Error", "Todos los campos deben estar llenos.", "error");
      return;
    }

    Swal.fire("¡Éxito!", "Tus datos han sido actualizados correctamente.", "success");
    console.log("Datos guardados:", editData);
    setShowModal(false);
  };

  const confirmLogout = () => {
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
  };

  return (
    <div className="container-perfil">
      {/* Sección de Perfil */}
      <div className="perfil-header">
        <div className="perfil-imagen">
          <i className="bi bi-person-circle icono-perfil"></i>
        </div>
        <div className="perfil-informacion">
          <h2>
            ¡Bienvenido,{" "}
            {`${userData.nombre || "Nombre"} `}!
          </h2>
          <p>{userData.correo || "Correo no disponible"}</p>
        </div>
        <div className="perfil-botones">
          <button className="boton-primario" onClick={() => setShowModal(true)}>
            Editar Datos
          </button>
          <button className="boton-peligro" onClick={confirmLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="perfil-formulario">
        <div className="grupo-formulario">
          <label>Full Name</label>
          <input
            type="text"
            placeholder={`${userData.nombre || "Nombre"} ${
              userData.apellido || "no disponible"
            }`}
            disabled
          />
        </div>
        <div className="grupo-formulario">
          <label>Correo Electrónico</label>
          <input type="email" placeholder={userData.correo || "Correo no disponible"} disabled />
        </div>
        <div className="grupo-formulario">
          <label>Teléfono</label>
          <input type="tel" placeholder={userData.telefono || "Teléfono no disponible"} disabled />
        </div>
        <div className="grupo-formulario">
          <label>Country</label>
          <input type="text" placeholder="Perú" disabled />
        </div>
      </div>

      {/* Sección de Pedidos */}
      <div className="perfil-pedidos">
        <div className="pedidos-header">
          <i className="bi bi-bag-fill icono-pedidos"></i>
          <h3>Mis Pedidos</h3>
        </div>
        <HistorialPedido historial={historial}/>
      </div>


      {/* Modal para editar datos */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="text-dark">Editar Datos</h2>
            <div className="modal-form">
              <div className="grupo-formulario">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={editData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grupo-formulario">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={editData.apellido}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grupo-formulario">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={editData.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grupo-formulario">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={editData.telefono}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button className="boton-primario" onClick={handleSaveChanges}>
                Guardar Cambios
              </button>
              <button className="boton-peligro" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
