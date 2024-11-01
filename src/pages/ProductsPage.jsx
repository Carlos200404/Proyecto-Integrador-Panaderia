// ProductsPage.jsx
import React from "react";
import useProductosYFiltrado from "../hooks/useProductosYFiltrado";
import Productos from "../components/Productos";
import "../stylesPages/StyleProductPage.css";

export default function ProductsPage() {
  const {
    productosAMostrar,
    productosFiltrados, // <-- Asegúrate de incluir productosFiltrados
    categorias,
    setFiltroPrecio,
    setBusqueda,
    setCategoriaSeleccionada,
    setOrden,
    precioMin,
    precioMax,
    filtroPrecio,
    busqueda,
    categoriaSeleccionada,
    orden,
    paginaActual,
    cambiarPagina,
    totalPaginas,
  } = useProductosYFiltrado();

  return (
    <div className="container-fluid">
      <div className="row justify-content-between align-items-center mb-4">
        <div className="col-auto">
          <button
            className="btn btn-filtrar mt-4 ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filtroProductos"
            aria-expanded="false"
            aria-controls="filtroProductos"
          >
            Filtrar
          </button>
        </div>

        <div className="col-auto text-end me-4">
          <label htmlFor="ordenSelect" className="form-label text-dark d-inline-block ordenar">
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
        <div id="filtroProductos" className="col-12 col-lg-3 mb-4 collapse d-lg-block">
          <div className="filtro p-3 ms-1 border rounded">
            <h4 className="mb-3 text-dark">Filtrar Productos</h4>

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
                onChange={(e) => setFiltroPrecio([filtroPrecio[0], parseFloat(e.target.value)])}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label text-dark">
                Categoría
              </label>
              <select
                id="categoria"
                className="form-select"
                value={categoriaSeleccionada || ""}
                onChange={(e) => setCategoriaSeleccionada(e.target.value || null)}
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

        <div className="col-12 col-lg-9">
          <p className="fw-bold ms-3">
            Mostrando {productosAMostrar.length} de {productosFiltrados.length} productos
          </p>

          {productosAMostrar.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {productosAMostrar.map((producto) => (
                <Productos key={producto.id} producto={producto} />
              ))}
            </div>
          ) : (
            <p>No hay productos disponibles dentro del rango de precios seleccionado.</p>
          )}

          <div className="pagination mt-4 mx-auto">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => cambiarPagina(index + 1)}
                className={`btn btn-sm mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-secondary"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
