import React from 'react';
import "./Registro.css";

function Registro({ carrito }) {
  return (
    <div className='container'>
      <h2>Confirmar Compras</h2>
      {carrito.length === 0 ? (
        <span>No hay productos en el carrito</span>
      ) : (
        carrito.map((producto, index) => (
          <span key={index} className="producto-seleccionado">
            {producto.nombre} - ${producto.precio}
          </span>
        ))
      )}
      <button className='confirmar'>Confirmar</button>
    </div>
  );
}

export default Registro;
