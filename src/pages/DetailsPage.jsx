import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "../stylesPages/DetailsPage.css";
import { CarritoContext } from "../context/CarritoContext";
import ProductosService from "../service/ProductosService";

export default function DetailsPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  const { agregarProducto } = useContext(CarritoContext);
  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
  });

  const agregarAlCarrito = () => {
    const resultado = agregarProducto({ ...producto, cantidad });

    if (resultado.success) {
      notyf.success(resultado.message);
    } else {
      notyf.error(resultado.message);
    }
  };

  const incrementarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    } else {
      notyf.error("No hay suficiente stock disponible.");
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  useEffect(() => {
    const obtenerDetallesProducto = async () => {
      try {
        const response = await ProductosService.obtenerProductoPorId(id);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerDetallesProducto();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!producto) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div className="container details-container">
      <h2 className="text-dark mx-5 my-5">Detalles del Producto</h2>
      <div className="row">
        <div className="col-6">
          <img
            src={producto.imageUrl}
            alt={producto.nombre}
            className="producto-imagen"
          />
        </div>
        <div className="col-6">
          <h2 className="text-dark">{producto.nombre}</h2>
          <p className="text-dark descripcion">{producto.descripcion}</p>
          <p className="text-dark precio">Precio: S/ {producto.precio}</p>

          <div className="cantidad-control">
            <button onClick={disminuirCantidad} className="btn-cantidad">
              -
            </button>
            <span>{cantidad}</span>
            <button onClick={incrementarCantidad} className="btn-cantidad">
              +
            </button>
          </div>

          <button
            onClick={agregarAlCarrito}
            className="btn-agregar-carrito mt-3"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
