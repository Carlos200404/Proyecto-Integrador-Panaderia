import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}

export default App;
