import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./components/Register";
import UserPage from "./pages/UserPage";
import DetailsPage from "./pages/DetailsPage";


import { CarritoProvider } from "./context/CarritoContext";

function App() {
  const location = useLocation();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  const noHeaderNoFooterRoutes = ["/usuario"];

  useEffect(() => {
    const noHeaderNoFooterRoutes = ["/usuario"];
    const allowedRoutesWithHeaderFooter = ["/", "/productos", "/contacto", "/usuario", "/descripcionProducto"];
  
    const isAllowedRoute = allowedRoutesWithHeaderFooter.some(route => location.pathname.startsWith(route));
  
    setHideHeaderFooter(!isAllowedRoute);
  }, [location.pathname]);
  

  return (
    <CarritoProvider>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/usuario" element={<UserPage />} />
        <Route path="/registro" element={<Register/>}/>
        <Route path="/descripcionProducto/:id" element={<DetailsPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
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
