import { useEffect, useState } from "react";
import { productos as productosData } from "../Productos/Productos";
import Button from "./Button";
import "./Carta.css";

function Carta({ 
  setCarrito, 
  productosEliminados, 
  limpiarProductosEliminados 
}) {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    setProductos(productosData);
  }, []);

  // Limpiar productos eliminados después de un momento
  useEffect(() => {
    if (productosEliminados.length > 0) {
      const timer = setTimeout(() => {
        limpiarProductosEliminados();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [productosEliminados, limpiarProductosEliminados]);

  return (
    <div className="carta-container">
      <h2>Lista de Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <Button 
              producto={producto} 
              setCarrito={setCarrito} 
              forceReset={productosEliminados.includes(producto.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carta;