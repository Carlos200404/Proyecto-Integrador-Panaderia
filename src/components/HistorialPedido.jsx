import React, { useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import Swal from "sweetalert2";
import axios from "axios";
import "../stylesComponent/HistorialPedido.css";

export default function HistorialPedido({ historial }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const itemsPerPage = 2;
  const { volverARealizarPedido } = useContext(CarritoContext);
  const [showModal, setShowModal] = useState(false);

  const obtenerDetallePedido = async (pedidoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/historial-pedidos/detalle/${pedidoId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener los detalles del pedido:", error);
      return null;
    }
  };

  const handleVerDetalles = async (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);

    const detalle = await obtenerDetallePedido(pedido.pedidoId);
    if (detalle) {
      setPedidoSeleccionado((prev) => ({ ...prev, ...detalle }));
    }
  };

  const handleVolverAPedir = (productos) => {
    const resultado = volverARealizarPedido(productos);

    if (resultado.success) {
      Swal.fire("¡Éxito!", resultado.message, "success");
    } else {
      Swal.fire("Error", resultado.message, "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPedidoSeleccionado(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historial.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(historial.length / itemsPerPage);

  return (
    <div className="container mt-4">
      {currentItems.length > 0 ? (
        currentItems.map((pedido) => (
          <div
            key={pedido.pedidoId}
            className="cartapedido position-relative"
            onClick={() => handleVerDetalles(pedido)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="estado-pedido position-absolute"
              style={{
                top: "10px",
                right: "10px",
                padding: "5px 15px",
                backgroundColor:
                  pedido.estado === "Pendiente"
                    ? "#007bff"
                    : pedido.estado === "Entregado"
                    ? "#28a745"
                    : "#6c757d",
                color: "#fff",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {(pedido.estado || "Desconocido").toUpperCase()}
            </div>

            <div className="pedido-info">
              <p>
                <strong>ID Pedido:</strong> {pedido.pedidoId}
              </p>
              <p>
                <strong>Total:</strong> S/{pedido.total}
              </p>
              <div className="productos">
                {pedido.productos.map((producto, index) => (
                  <img
                    key={index}
                    src={producto.imageUrl}
                    alt={producto.nombreProducto}
                    className="img-fluid producto-img"
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes pedidos en tu historial.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination mt-4 d-flex justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn mx-1 ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {showModal && pedidoSeleccionado && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="text-dark">Detalles del Pedido</h2>
            <div className="modal-form">
              <p>
                <strong>ID Pedido:</strong> {pedidoSeleccionado.pedidoId}
              </p>
              <p>
                <strong>Total:</strong> S/{pedidoSeleccionado.total}
              </p>
              <p>
                <strong>Estado:</strong> {pedidoSeleccionado.estado}
              </p>
              <p>
                <strong>Método de Entrega:</strong>{" "}
                {pedidoSeleccionado.metodoEntrega}
              </p>
              <p>
                <strong>Detalle de Entrega:</strong>{" "}
                {pedidoSeleccionado.detalleEntrega}
              </p>
              <p>
                <strong>Fecha:</strong> {pedidoSeleccionado.fecha}
              </p>
              <h5>Productos:</h5>
              <div className="productos-grid">
                {pedidoSeleccionado.productos.map((producto, index) => (
                  <div
                    key={index}
                    className="producto-detalle"
                    style={{
                      borderBottom: "1px solid #ddd",
                      marginBottom: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <img
                      src={producto.imageUrl}
                      alt={producto.nombreProducto}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <div>
                      <p>
                        <strong>Nombre:</strong> {producto.nombreProducto}
                      </p>
                      <p>
                        <strong>Cantidad:</strong> {producto.cantidad}
                      </p>
                      <p>
                        <strong>Subtotal:</strong> S/{producto.subtotal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className="btn btn-success"
                onClick={() =>
                  handleVolverAPedir(pedidoSeleccionado.productos)
                }
              >
                Volver a Hacer Pedido
              </button>
              <button className="btn btn-danger" onClick={handleCloseModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
