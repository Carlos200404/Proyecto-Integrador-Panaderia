import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const agregarProducto = (producto) => {
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      if (productoExistente.cantidad + producto.cantidad > producto.stock) {
        return { success: false, message: "No hay suficiente stock disponible." };
      }
      productoExistente.cantidad += producto.cantidad;
    } else {
      if (producto.stock < producto.cantidad) {
        return { success: false, message: "Producto agotado." };
      }
      nuevoCarrito.push(producto);
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    return { success: true, message: "Producto agregado al carrito." };
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, setCarrito, agregarProducto, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
