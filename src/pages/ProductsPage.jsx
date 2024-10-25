import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [precioMin, setPrecioMin] = useState(1);
  const [precioMax, setPrecioMax] = useState(120);
  const [filtroPrecio, setFiltroPrecio] = useState([1, 120]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get(
          "http://localhost:8081/api/productos/listarProductos"
        );
        setProductos(respuesta.data);
      } catch (error) {
        console.log("Error al obtener los productos", error);
      }
    };

    obtenerProductos();
  }, []);

  const filtrarProductos = () => {
    return productos
      .filter(
        (producto) =>
          producto.precio >= filtroPrecio[0] &&
          producto.precio <= filtroPrecio[1]
      )
      .filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
  };

  return (
    <>
      <h1 className="text-center my-4">Nuestros Productos</h1>
      <div className="container-fluid">
        <div className="row">
          {/* Barra de búsqueda */}
          <div className="col-12 mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-2">
            <div className="filtro-precios">
              <h5>Filtrar por precios</h5>
              <input
                type="range"
                min={precioMin}
                max={precioMax}
                value={filtroPrecio[0]}
                onChange={(e) =>
                  setFiltroPrecio([parseFloat(e.target.value), filtroPrecio[1]])
                }
              />

              <p>
                Precio: S/{filtroPrecio[0]} - S/{filtroPrecio[1]}
              </p>
            </div>
          </div>

          {/* Productos */}
          <div className="col-10">
            {filtrarProductos().length > 0 ? (
              <div className="row">
                {filtrarProductos().map((producto) => (
                  <div key={producto.id} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src={producto.imgURL || "default.jpg"}
                        alt={producto.nombre}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text">
                          Precio: S/ {producto.precio}
                        </p>
                        <p className="card-text">Stock: {producto.stock}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                No hay productos disponibles dentro del rango de precios
                seleccionado.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
