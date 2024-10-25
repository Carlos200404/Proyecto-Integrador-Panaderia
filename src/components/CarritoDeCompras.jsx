import React, { useState, useEffect } from "react";
import "../stylesComponent/styleCarrito.css";

export default function CarritoDeCompras({ mostrarCarrito, cerrarCarrito }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad < nuevoCarrito[index].stock) {
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    } else {
      alert("No hay suficiente stock disponible.");
    }
  };

  const disminuirCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + producto.precio * (producto.cantidad || 1);
    }, 0);
  };

  return (
    <div className={`carrito-panel ${mostrarCarrito ? "mostrar" : ""}`}>
      {/* Botón para cerrar el carrito */}
      <button className="cerrar-carrito mt-1" onClick={cerrarCarrito}>
        &times;
      </button>

      <h2>Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {carrito.map((producto, index) => (
            <div key={index} className="producto-carrito">
              <img
                src={producto.imageUrl}
                alt={producto.nombre}
                className="imagen-producto"
              />
              <div className="detalles-producto">
                <h5>{producto.nombre}</h5>
                <p>Precio: S/ {producto.precio}</p>
                <div className="cantidad-producto">
                  <button onClick={() => disminuirCantidad(index)}>-</button>
                  <span>{producto.cantidad || 1}</span>
                  <button onClick={() => aumentarCantidad(index)}>+</button>
                </div>
              </div>
            </div>
          ))}

          <div className="total-carrito">
            <h5 className="fw-bold">Total: S/ {calcularTotal().toFixed(2)}</h5>
          </div>
          <button className="btn-pagina-carrito my-3" onClick={vaciarCarrito}>
            Ir a Pagar
          </button>
          <button className="btn-vaciar-carrito" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
}
