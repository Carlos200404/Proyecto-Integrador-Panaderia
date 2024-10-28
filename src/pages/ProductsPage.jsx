import React, { useEffect, useState } from "react";
import axios from "axios";
import Productos from "../components/Productos";
import "../stylesPages/StyleProductPage.css";

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [precioMin, setPrecioMin] = useState(1);
  const [precioMax, setPrecioMax] = useState(120);
  const [filtroPrecio, setFiltroPrecio] = useState([1, 120]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [orden, setOrden] = useState("");

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
  }, []);

  const filtrarProductos = () => {
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
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center mb-4">
          {/* Botón para mostrar el filtro en pantallas pequeñas */}
          <div className="col-auto">
            <button
              className="btn btn-filtrar mt-4 ms-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filtroProductos"
              aria-expanded="false"
              aria-controls="filtroProductos"
            >Filtrar
            </button>
          </div>

          {/* Select para ordenar por precio */}
          <div className="col-auto text-end me-4">
            <label
              htmlFor="ordenSelect"
              className="form-label text-dark d-inline-block ordenar"
            >
              Ordenar por precio:
            </label>
            <select
              id="ordenSelect"
              className="form-select ordenPrecio d-inline-block ordenar"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="">Orden por defecto</option>
              <option value="bajo-alto">Precio: bajo a alto</option>
              <option value="alto-bajo">Precio: alto a bajo</option>
            </select>
          </div>
        </div>

        <div className="row">
          {/* Filtro de productos */}
          <div
            id="filtroProductos"
            className="col-12 col-lg-3 mb-4 collapse d-lg-block"
          >
            <div className="filtro p-3 ms-1 border rounded">
              <h4 className="mb-3 text-dark">Filtrar Productos</h4>

              {/* Buscar por Nombre */}
              <div className="mb-3">
                <label htmlFor="busqueda" className="form-label text-dark">
                  Buscar por Nombre
                </label>
                <input
                  type="text"
                  id="busqueda"
                  className="form-control"
                  placeholder="Buscar por nombre"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              {/* Filtrar por Precio */}
              <div className="mb-3">
                <label htmlFor="filtroPrecio" className="form-label text-dark">
                  Precio Máximo: S/{filtroPrecio[1]}
                </label>
                <input
                  type="range"
                  className="form-range"
                  min={precioMin}
                  max={precioMax}
                  value={filtroPrecio[1]}
                  onChange={(e) =>
                    setFiltroPrecio([
                      filtroPrecio[0],
                      parseFloat(e.target.value),
                    ])
                  }
                />
              </div>

              {/* Filtrar por Categoría */}
              <div className="mb-3">
                <label htmlFor="categoria" className="form-label text-dark">
                  Categoría
                </label>
                <select
                  id="categoria"
                  className="form-select"
                  value={categoriaSeleccionada || ""}
                  onChange={(e) =>
                    setCategoriaSeleccionada(e.target.value || null)
                  }
                >
                  <option value="">Sin categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.nombre}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Listado de productos filtrados */}
          <div className="col-12 col-lg-9">
            <p className="fw-bold ms-3">
              Mostrando {filtrarProductos().length} resultados
            </p>

            {filtrarProductos().length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
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
