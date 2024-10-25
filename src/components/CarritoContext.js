import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const agregarProducto = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
