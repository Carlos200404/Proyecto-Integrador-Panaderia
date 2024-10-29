import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes, { validRoutes } from "./routes/AppRoutes";
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  const location = useLocation();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  const noHeaderNoFooterRoutes = ["/usuario", "/registro"];

  useEffect(() => {
    const isDescripcionProducto = location.pathname.startsWith(
      "/descripcionProducto/"
    );
    const isValidRoute =
      validRoutes.includes(location.pathname) || isDescripcionProducto;
    const shouldHideHeaderFooter =
      noHeaderNoFooterRoutes.includes(location.pathname) || !isValidRoute;

    setHideHeaderFooter(shouldHideHeaderFooter);
  }, [location.pathname]);

  return (
    <CarritoProvider>
      {!hideHeaderFooter && <Header />}
      <AppRoutes />
      {!hideHeaderFooter && <Footer />}
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
