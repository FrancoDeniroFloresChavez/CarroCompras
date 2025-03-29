import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Registro.css";

function Registro({ carrito, setCarrito, eliminarProducto }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordenConfirmada, setOrdenConfirmada] = useState(false);
  const [mensajeError, setMensajeError] = useState(""); // Estado para el mensaje de error

  const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

  const handleConfirmar = () => {
    if (carrito.length === 0) {
      setMensajeError("Agregar productos");
      setTimeout(() => setMensajeError(""), 2000); // Ocultar el mensaje después de 2s
      return;
    }
    setIsModalOpen(true);
  };

  const confirmarOrden = () => {
    // Obtener todos los IDs de productos en el carrito
    const idsProductos = carrito.map(producto => producto.id);
    
    // Marcar todos los productos como eliminados (igual que al hacer clic en X)
    eliminarProducto(null, idsProductos); // Pasamos null como primer argumento y los IDs como segundo
    
    setIsModalOpen(false); // Cierra el modal
    setOrdenConfirmada(true); // Muestra mensaje de confirmación
    setCarrito([]); // Reinicia el carrito
    setTimeout(() => {
      setOrdenConfirmada(false);
    }, 3000);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2>Confirmar Compras</h2>

      {carrito.length === 0 ? (
        <span>No hay productos en el carrito</span>
      ) : (
        <>
          {carrito.map((producto) => (
            <div key={producto.id} className="producto-seleccionado">
              <span>
                X{producto.cantidad} {producto.nombre} - ${producto.precio * producto.cantidad}
              </span>
              <AiOutlineClose className="eliminar-icono" onClick={() => eliminarProducto(producto.id)} />
            </div>
          ))}
          <h3 className="total">Total: ${total.toFixed(2)}</h3>
        </>
      )}

      <button className="confirmar" onClick={handleConfirmar}>
        Confirmar
      </button>

      {/* Mostrar mensaje de error si el carrito está vacío */}
      {mensajeError && <p className="error">{mensajeError}</p>}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Detalles de la Compra</h2>
              <button className="close-modal" onClick={cerrarModal}>
                <AiOutlineClose />
              </button>
            </div>
            <ul className="modal-lista">
              {carrito.map((producto) => (
                <li key={producto.id} className="modal-item">
                  <img src={producto.imagen} alt={producto.nombre} className="modal-img" />
                  <span>
                    X{producto.cantidad} {producto.nombre} - ${producto.precio * producto.cantidad}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="modal-total">Total: ${total.toFixed(2)}</h3>
            <button onClick={confirmarOrden} className="Orden-Confirmada">
              Confirmar Orden
            </button>
          </div>
        </div>
      )}

      {/* Mensaje de "Gracias por tu compra" */}
      {ordenConfirmada && (
        <div className="mensaje-gracias">
          <p>Gracias por tu compra</p>
        </div>
      )}
    </div>
  );
}

export default Registro;