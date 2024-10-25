
const productos = [
  {
    id: 1,
    nombre: "Empanadas de Carne",
    imagenURL: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/bf589fccb5d1100494ef859b7af5c0e0/Derivates/7813af30173d4b3593a2045c50c46bc2e96a326e.jpg",
    precio: 8.50
  },
  {
    id: 2,
    nombre: "Alfajores",
    imagenURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GNZjkK8iTz4VVRTXUhLcfMF7S_Ab9AThOg&s",
    precio: 8.50
  },
  {
    id: 3,
    nombre: "Pionono",
    imagenURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgavGcSz32J8WmR85CKuRhSModYIsQS9-CPw&s",
    precio: 8.50
  },
  {
    id: 4,
    nombre: "Croissant de Almendras",
    imagenURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAE52t6mMA09Qf8FmyTqZb03A19z4WTU15pQ&s",
    precio: 8.50
  }
];

export default function ProductosDestacados() {
  return (
    <>
      <h1 className="text-center my-5">
        Nuestros <span className="text-destacado">Productos Destacados</span> !
      </h1>

      <div className="container-fluid">
        <div className="row justify-content-center">
          {productos.slice(0, 4).map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-3 d-flex justify-content-center mb-4">
              <div className="card fw-bold">
                <img
                  src={producto.imagenURL}
                  alt={producto.nombre}
                />
                <div className="card-body text-center text-light">
                  <p className="card-text">{producto.nombre}</p>
                  <p className="card-text">Desde S/.{producto.precio.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
