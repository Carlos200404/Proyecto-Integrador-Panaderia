import React from 'react';
import '../stylesComponent/HistorialPedido.css'; // Asegúrate de importar el CSS
export default function HistorialPedido({ historial }) {
    return (
      <div className="container mt-4">
        <h3 className="mb-4 text-start fw-bold">Historial Pedidos</h3>
        {historial.length > 0 ? (
          historial.map((pedido) => (
            <div key={pedido.pedidoId} className="cartapedido">
              {/* Información del Pedido */}
              <div className="pedido-info">
                <p>ID: {pedido.pedidoId}</p>
                <p>
                  <strong>Total:</strong> S/{pedido.total}
                </p>
                {/* Imágenes de los Productos */}
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
              {/* Botones */}
              <div className="btn-group">
                <button className="btn btn-primary">Ver Detalles</button>
                <button className="btn btn-secondary">Volver a Pedir</button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes pedidos en tu historial.</p>
        )}
      </div>
    );
  }
  