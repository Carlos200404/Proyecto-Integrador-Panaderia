import "../stylesPages/StyleContactPage.css";
export default function ContactPage() {
  return (
    <>

      <div className="container my-5">
        <h2 className="text-center mb-4">Formulario de Contacto</h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="nombre" className="form-label fw-bold">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="telefono" className="form-label fw-bold">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="telefono"
              placeholder="Ingresa tu número de teléfono"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="mensaje" className="form-label fw-bold">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="mensaje"
              rows="4"
              placeholder="Escribe tu mensaje aquí"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn text-light btn-block" id="btn-formulario">
            Enviar
          </button>
        </form>
      </div>
    </>
  )
}
