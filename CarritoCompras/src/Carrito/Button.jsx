import { useState, useEffect } from "react";
import "./Button.css";

function Button({ producto, setCarrito, forceReset = false }) {
  const [cantidad, setCantidad] = useState(0);

  // Efecto para forzar reset cuando se elimina el producto
  useEffect(() => {
    if (forceReset) {
      setCantidad(0);
    }
  }, [forceReset]);

  const agregar = () => {
    setCantidad(1);
    setCarrito(prev => [...prev, { ...producto, cantidad: 1 }]);
  };

  const incrementar = () => {
    setCantidad(cantidad + 1);
    setCarrito(prev => prev.map(p => 
      p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
    ));
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setCarrito(prev => prev.map(p => 
        p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad - 1 } : p
      ));
    } else {
      setCantidad(0);
      setCarrito(prev => prev.filter(p => p.nombre !== producto.nombre));
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