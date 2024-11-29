import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const CartPage = () => {
  const { carrito, setCarrito } = useContext(CarritoContext);

  const actualizarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito
      .map((producto) => {
        if (producto.id === id) {
          const nuevaCantidad = producto.cantidad + cantidad;
          if (nuevaCantidad < 1) {
            return null; // Eliminar producto si la cantidad es menor a 1
          }
          return { ...producto, cantidad: nuevaCantidad };
        }
        return producto;
      })
      .filter(Boolean); // Elimina productos nulos
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  if (carrito.length === 0) {
    return <p className="text-center mt-5 text-dark">Tu carrito está vacío.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <Link to="/productos" className="text-decoration-none text-dark">
          <span className="fw-bold">&larr; Productos / Carrito</span>
        </Link>
        <h2 className="mt-2 text-dark">
          Tu Carrito de Compras ({carrito.length}):
        </h2>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <img
                    src={producto.imageUrl}
                    alt={producto.nombre}
                    className="img-fluid"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>S/ {producto.precio.toFixed(2)}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-sm btn-danger mx-2"
                      onClick={() => actualizarCantidad(producto.id, -1)}
                    >
                      -
                    </button>
                    <span>{producto.cantidad}</span>
                    <button
                      className="btn btn-sm btn-success mx-2"
                      onClick={() => actualizarCantidad(producto.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>S/ {(producto.precio * producto.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-md-center">
        <h5 className="me-md-3 mb-3 mb-md-0">
          <strong className="fw-bold">SubTotal:</strong> S/ {calcularTotal().toFixed(2)}
        </h5>
        <Link to={"/checkout"}>
          <button className="btn btn-primary">Ir a pagar</button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
