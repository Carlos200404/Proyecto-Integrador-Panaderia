import React from "react";
import "../stylesComponent/StyleCarrusel.css"; 

export default function Carrusel() {
  return (
    <div className="carrusel-container">
      <div className="carrusel">
        <div className="carrusel-item">
          <img
            src="https://link-a-tu-imagen-de-pan.jpg" 
            alt="Panadería"
            className="carrusel-image"
          />
          <div className="carrusel-text">
            <h2>Descubre el <span className="highlight">Sabor Auténtico</span> de la Tradición</h2>
            <p>Disfruta Cada Bocado con <span className="highlight">Ingredientes de Calidad</span></p>
            <button className="btn-productos">Ver Productos</button>
          </div>
        </div>
      </div>
      {/* Puntos de navegación del carrusel */}
      <div className="carrusel-nav">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}
