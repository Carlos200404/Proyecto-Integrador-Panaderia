import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes, { validRoutes } from "./routes/AppRoutes";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthContext, AuthProvider } from "./context/AuthContext"; // Importación corregida

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext); // Usa correctamente el AuthContext
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  const noHeaderRoutes = ["/usuario", "/registro"];
  const noFooterRoutes = [
    "/carrito",
    "/productos",
    "/checkout",
    "/usuario",
    "/descripcionProducto/:id",
  ];

  useEffect(() => {
    const isDescripcionProducto = location.pathname.startsWith(
      "/descripcionProducto/"
    );

    const isNotFoundPage = !validRoutes.some((route) =>
      location.pathname.match(new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`))
    );

    // Determina si el Header debe ocultarse
    setHideHeader(
      noHeaderRoutes.includes(location.pathname) || isNotFoundPage
    );

    // Determina si el Footer debe ocultarse
    setHideFooter(
      noFooterRoutes.includes(location.pathname) || isDescripcionProducto || isNotFoundPage
    );
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
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default RootApp;
