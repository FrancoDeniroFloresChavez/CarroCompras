import { useEffect, useState } from "react";
import { productos as productosData } from "../Productos/Productos";
import "./Carta.css";

function Carta({ setCarrito }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(productosData);
  }, []);

  return (
    <div className="carta-container">
      <h2>Lista de Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <button onClick={() => setCarrito(prev => [...prev, producto])} className="añadir">
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carta;
