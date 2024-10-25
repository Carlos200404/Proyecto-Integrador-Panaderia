import React from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "../stylesComponent/styleProductos.css";

export default function Productos({ producto }) {
  const notyf = new Notyf({
    duration: 5000,
    dismissible: true,
  });

  const agregarProducto = () => {
    console.log(`Producto agregado: ${producto.nombre}`);
    let carrito = localStorage.getItem("carrito");

    if (!carrito) {
      carrito = [];
    } else {
      carrito = JSON.parse(carrito);
    }

    // Buscar el producto en el carrito
    const productoExistente = carrito.find((item) => item.id === producto.id);

    // Si el producto ya está en el carrito, verificar si el stock es suficiente
    if (productoExistente) {
      if (productoExistente.cantidad + 1 > producto.stock) {
        notyf.error("No hay suficiente stock disponible para este producto.");
        return; // Detener la función si no hay suficiente stock
      }
      productoExistente.cantidad += 1; // Incrementar cantidad si hay stock suficiente
    } else {
      // Si el producto no está en el carrito, verificar stock antes de agregarlo
      if (producto.stock < 1) {
        notyf.error("Producto agotado.");
        return;
      }
      carrito.push({ ...producto, cantidad: 1 });
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    notyf.success("Producto agregado al carrito.");
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card mx-1 producto-card">
        <div className="img-container">
          <img
            src={producto.imageUrl || "default.jpg"}
            alt={producto.nombre}
            className="card-img-top"
          />
          <div className="add-to-cart" onClick={agregarProducto}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="black"
              className="bi bi-basket2-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1" />
            </svg>
          </div>
        </div>
        <div className="card-body">
          <p className="text-center my-0 categoria fw-bold">
            {producto.categoria.nombre}
          </p>
          <h5 className="card-title text-center">{producto.nombre}</h5>
          <p className="card-text text-center">Precio: S/ {producto.precio}</p>
        </div>
      </div>
    </div>
  );
}
