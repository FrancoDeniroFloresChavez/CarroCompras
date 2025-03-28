import { useState } from "react";

import "./Button.css"; // Asegúrate de tener estilos

function Button({ producto, setCarrito }) {
  const [cantidad, setCantidad] = useState(0);

  const agregar = () => {
    setCantidad(1);
    setCarrito(prev => [...prev, producto]);
  };

  const incrementar = () => {
    setCantidad(cantidad + 1);
    setCarrito(prev => [...prev, producto]);
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setCarrito(prev => prev.slice(0, -1)); // Quita el último producto agregado
    } else {
      setCantidad(0);
      setCarrito(prev => prev.filter(p => p !== producto)); // Elimina el producto si es 0
    }
  };

  return (
    <div className="boton-container">
      {cantidad === 0 ? (
        <button className="añadir" onClick={agregar}>
           Añadir al carrito
        </button>
      ) : (
        <div className="contador">
          <button className="btn-restar" onClick={decrementar}>-</button>
          <span className="cantidad">{cantidad}</span>
          <button className="btn-sumar" onClick={incrementar}>+</button>
        </div>
      )}
    </div>
  );
}

export default Button;
