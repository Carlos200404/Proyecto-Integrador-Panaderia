import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import Register from "../components/Register";
import UserPage from "../pages/UserPage";
import DetailsPage from "../pages/DetailsPage";

export const validRoutes = ["/", "/productos", "/contacto", "/usuario", "/registro", "/descripcionProducto/:id"];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/usuario" element={<UserPage />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/descripcionProducto/:id" element={<DetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
