import React from "react";
import "../stylesComponent/styleFiltro.css";

export default function Filtro({
  busqueda,
  setBusqueda,
  filtroPrecio,
  setFiltroPrecio,
  precioMin,
  precioMax,
}) {
  return (
    <div className="col-md-3 text-center filtro-container">
      <div className="mb-2">
        <h5 className="mt-4 text-filtrar">Filtrar por Nombre</h5>
        <input
          type="text"
          className="form-control filtro-input"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="filtro-precios">
        <h5 className="mt-4 text-filtrar">Filtrar por precios</h5>
        <input
          type="range"
          className="filtro-range"
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
  );
}
