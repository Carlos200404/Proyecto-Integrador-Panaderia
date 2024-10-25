// ProductsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Productos from "../components/Productos";
import Filtro from "../components/Filtro";
import "../stylesPages/StyleProductPage.css";

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [precioMin, setPrecioMin] = useState(1);
  const [precioMax, setPrecioMax] = useState(120);
  const [filtroPrecio, setFiltroPrecio] = useState([1, 120]);
  const [busqueda, setBusqueda] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1400);

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

    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1400);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
      <div className={isWideScreen ? "container-fluid" : "container"}>
        <div className="row">
          {/* Filtros */}
          <Filtro
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            filtroPrecio={filtroPrecio}
            setFiltroPrecio={setFiltroPrecio}
            precioMin={precioMin}
            precioMax={precioMax}
          />

          {/* Productos */}
          <div className="col-md-9">
            {filtrarProductos().length > 0 ? (
              <div className="row">
                {filtrarProductos().map((producto) => (
                  <Productos key={producto.id} producto={producto} />
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
