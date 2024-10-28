import React, { useEffect, useState } from "react";
import productoDestacadoService from "../service/productoDestacadoService";
import "../stylesComponent/styleProductosDestacados.css";
import Productos from "./Productos"; 

export default function ProductosDestacados() {
    const [productosDestacados, setProductosDestacados] = useState([]);

    useEffect(() => {
        productoDestacadoService.obtenerProductosDestacados()
            .then(response => {
                setProductosDestacados(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los productos destacados:", error);
            });
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="text-center my-5">Nuestros Productos Destacados</h1>
            <div className="row">
                {productosDestacados.map((producto) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={producto.id}>
                        <Productos producto={producto} />
                    </div>
                ))}
            </div>
        </div>
    );
}
