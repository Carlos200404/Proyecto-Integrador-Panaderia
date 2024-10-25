import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Import de Componentes y Paginas
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const noHeaderFooterRoutes = ["*"];

  return (
    <>
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
