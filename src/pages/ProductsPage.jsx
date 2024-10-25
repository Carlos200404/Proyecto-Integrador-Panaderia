import React, { useEffect, useState } from "react";
import axios from "axios";
import Productos from "../components/Productos";
import Filtro from "../components/Filtro";
import "../stylesPages/StyleProductPage.css";

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [precioMin, setPrecioMin] = useState(1);
  const [precioMax, setPrecioMax] = useState(120);
  const [filtroPrecio, setFiltroPrecio] = useState([1, 120]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [orden, setOrden] = useState(""); // Estado para manejar el orden seleccionado
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1400);

  useEffect(() => {
    const obtenerProductosYCategorias = async () => {
      try {
        const respuestaProductos = await axios.get(
          "http://localhost:8081/api/productos/listarProductos"
        );
        setProductos(respuestaProductos.data);

        const respuestaCategorias = await axios.get(
          "http://localhost:8081/api/categorias"
        );
        setCategorias(respuestaCategorias.data);
      } catch (error) {
        console.log("Error al obtener los productos o categorías", error);
      }
    };

    obtenerProductosYCategorias();

    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1400);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtrarProductos = () => {
    // Hacer una copia de los productos filtrados
    let productosFiltrados = [...productos]
      .filter(
        (producto) =>
          producto.precio >= filtroPrecio[0] &&
          producto.precio <= filtroPrecio[1]
      )
      .filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
      .filter((producto) => {
        if (!categoriaSeleccionada) return true;
        return producto.categoria.nombre === categoriaSeleccionada;
      });
  
    // Ordenar productos según la opción seleccionada
    if (orden === "bajo-alto") {
      productosFiltrados = productosFiltrados.sort(
        (a, b) => a.precio - b.precio
      );
    } else if (orden === "alto-bajo") {
      productosFiltrados = productosFiltrados.sort(
        (a, b) => b.precio - a.precio
      );
    }
  
    return productosFiltrados;
  };
  

  return (
    <>
      <h1 className="text-center my-4">Nuestros Productos</h1>
      <div className={isWideScreen ? "container-fluid" : "container"}>
        <div className="row">
          <Filtro
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            filtroPrecio={filtroPrecio}
            setFiltroPrecio={setFiltroPrecio}
            precioMin={precioMin}
            precioMax={precioMax}
            categorias={categorias}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
          />

          <div className="col-md-9">
            {/* Select para ordenar productos */}
            <div className="mb-3 text-end">
              <label htmlFor="ordenSelect" className="form-label">
                Ordenar por precio:
              </label>
              <select
                id="ordenSelect"
                className="form-select"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
              >
                <option value="">Orden por defecto</option>
                <option value="bajo-alto">Precio: bajo a alto</option>
                <option value="alto-bajo">Precio: alto a bajo</option>
              </select>
            </div>

            {/* Mostrar la cantidad de productos */}
            <p>Mostrando {filtrarProductos().length} resultados</p>

            {filtrarProductos().length > 0 ? (
              <div className="row">
                {filtrarProductos().map((producto) => (
                  <Productos key={producto.id} producto={producto} />
                ))}
              </div>
            ) : (
              <p>No hay productos disponibles dentro del rango de precios seleccionado.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
