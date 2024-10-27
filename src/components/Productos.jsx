import React, { useContext } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "../stylesComponent/styleProductos.css";
import { CarritoContext } from "./CarritoContext";

export default function Productos({ producto }) {
  const { agregarProducto } = useContext(CarritoContext);
  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
  });

  const agregarAlCarrito = () => {
    const resultado = agregarProducto(producto);

    if (resultado.success) {
      notyf.success(resultado.message);
    } else {
      notyf.error(resultado.message);
    }
  };

  return (
    <div className="col-sm-6 col-md-4  mb-4">
      <div className="card mx-1 producto-card">
        <div className="img-container">
          <img
            src={producto.imageUrl || "default.jpg"}
            alt={producto.nombre}
            className="card-img-top"
          />
          <div className="add-to-cart" onClick={agregarAlCarrito}>
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
