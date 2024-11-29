import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes, { validRoutes } from "./routes/AppRoutes";
import { CarritoProvider } from "./context/CarritoContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  const noHeaderRoutes = ["/usuario", "/registro"];
  const noFooterRoutes = [
    "/carrito",
    "/productos",
    "/checkout",
    "/usuario",
    "/descripcionProducto/:id", // No queremos que el Footer esté en esta página
  ];

  useEffect(() => {
    const isDescripcionProducto = location.pathname.startsWith(
      "/descripcionProducto/"
    );

    const isValidRoute =
      validRoutes.includes(location.pathname) || isDescripcionProducto;

    // Determina si el Header debe ocultarse
    const shouldHideHeader =
      noHeaderRoutes.includes(location.pathname) || !isValidRoute;
    setHideHeader(shouldHideHeader);

    // Determina si el Footer debe ocultarse
    const shouldHideFooter =
      noFooterRoutes.includes(location.pathname) || isDescripcionProducto;
    setHideFooter(shouldHideFooter); // Siempre ocultar Footer en detalles producto
  }, [location.pathname]);

  return (
    <CarritoProvider>
      {!hideHeader && <Header />}
      <AppRoutes />
      {!hideFooter && <Footer />}
    </CarritoProvider>
  );
}

function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default RootApp;
