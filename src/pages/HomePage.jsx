import React from "react";
import "../stylesPages/StyleHomePage.css";
import Carrusel from "../components/Carrusel";
import ProductosDestacados from "../components/ProductosDestacados";

export default function HomePage() {
  return (
    <>
      <Carrusel />
      <ProductosDestacados />
      <div className="section-nosotros">
        <h1 className="text-center">Nosotros</h1>

        <div className="container-historia mt-5">
          <div className="cuadro-fondo"></div>
          <img
            className="img-historia"
            src="https://artesaniadelhorno.com/wp-content/uploads/2022/08/quienes-somos-1.png"
            alt="Nuestra Historia"
          />
          <div className="texto-historia">
            <h3>¿Cómo empezamos?</h3>
            <p>
              Velasco es una empresa familiar con una rica historia que se
              remonta a 1936 en la ciudad de Ica, Perú. 
               La Panadería Velasco fue fundada por don José Velasco, un
              emprendedor y apasionado panadero que llegó a Ica desde la región
              de Ayacucho. Don José comenzó su negocio en un pequeño localen el
              centro de la ciudad, donde ofrecía panfresco y dulces
              tradicionales.
            </p>
          </div>
        </div>

        <div className="container-historia-reverse">
          <div className="cuadro-fondo-reverse"></div>
          <div className="texto-historia">
            <h3>Nuestra Misión</h3>
            <p>
              Somos una empresa dedicada a la elaboración de los más exquisitos
              dulces y pasteles llenos de tradición y sabor único,complaciendo
              los antojos de nuestros clientes con productos de calidad y
              saludables; en un ambiente agradable desarrollados por
              un equipo humano competente, comprometido en proporcionarexcelente
              servicio y satisfacción, generando desarrollo económicosocial al
              país y la empresa.
            </p>
          </div>
          <img
            className="img-historia"
            src="https://artesaniadelhorno.com/wp-content/uploads/2022/08/quienes-somos-2.png"
            alt="Misión"
          />
        </div>

        <div className="container-historia">
          <div className="cuadro-fondo"></div>
          <img
            className="img-historia"
            src="https://artesaniadelhorno.com/wp-content/uploads/2022/08/quienes-somos-1.png"
            alt="Visión"
          />
          <div className="texto-historia">
            <h3>Nuestra Visión</h3>
            <p>
              Seguir siendo la empresa pastelera líder en la ciudad de ICA y
              continuar creciendo para lograr la expansión a nivel nacional
              buscando la plenasatisfacción de los clientes que nos visitan,
              dándoles cada vez un mejorservicio y mayor atención para
              Ser reconocidos como la mejor pastelería
              y dulcería, en donde nuestro compromiso principal sea crear
              experiencias agradables al paladar de nuestros clientes.
            </p>
          </div>
        </div>
      </div>
      <div className="container my-5 text-center">
        <h1 className="text-center">Encuéntranos Aquí</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7740.4354120853295!2d-75.73005606744452!3d-14.064317803853925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e2bcfcbb2557%3A0xbb2a3f7870d205ff!2sDulcer%C3%ADa%20y%20Pasteler%C3%ADa%20Velazco!5e0!3m2!1ses-419!2spe!4v1729714057601!5m2!1ses-419!2spe"
          width="900"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-4"
        ></iframe>
      </div>
    </>
  );
}
