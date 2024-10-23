import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
// Import de Componentes y Paginas
import Header from './components/Header';
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/productos' element={<ProductsPage/>}/>
        <Route path='/contacto' element={<ContactPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
