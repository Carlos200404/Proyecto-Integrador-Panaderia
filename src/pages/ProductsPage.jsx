import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get("http://localhost:8081/api/productos/listarProductos");
        setProductos(respuesta.data);  
      } catch (error) {
        console.log("Error al obtener los productos", error);
      }
    };

    obtenerProductos();  
  }, []);  

  return (
    <>
      <h1 className='text-center my-4'>Nuestros Productos</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            {/* Aquí puedes poner algún contenido adicional */}
          </div>
          <div className="col-10">
            {productos.length > 0 ? (
              <div className="row">
                {productos.map(producto => (
                  <div key={producto.id} className="col-md-4 mb-4">
                    <div className="card">
                      <img src={producto.imgURL || "default.jpg"} alt={producto.nombre} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text">Precio: S/ {producto.precio}</p>
                        <p className="card-text">Stock: {producto.stock}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
