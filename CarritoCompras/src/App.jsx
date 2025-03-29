import "./App.css";
import Carta from "./Carrito/Carta";
import Registro from "./Carrito/Registro";
import { useState, useCallback } from "react";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [productosEliminados, setProductosEliminados] = useState([]);
  const [resetBotones, setResetBotones] = useState(false);

  const eliminarProducto = useCallback((id, idsMultiples = null) => {
    if (idsMultiples) {
      // Caso múltiple: cuando confirmamos la orden completa
      setCarrito([]); // Vaciar el carrito
      // Marcar todos los productos como eliminados para que los botones se reseteen
      setProductosEliminados(prev => [...prev, ...idsMultiples]);
    } else {
      // Caso individual: cuando eliminamos un producto específico
      setCarrito(prevCarrito => prevCarrito.filter(producto => producto.id !== id));
      // Marcar producto como eliminado para que el botón se resetee
      setProductosEliminados(prev => [...prev, id]);
    }
  }, []);

  // Función para limpiar los productos eliminados después de un tiempo
  const limpiarProductosEliminados = useCallback(() => {
    setProductosEliminados([]);
  }, []);

  return (
    <div className="contenedor-app">
      <Carta 
        setCarrito={setCarrito} 
        productosEliminados={productosEliminados}
        limpiarProductosEliminados={limpiarProductosEliminados}
      />
      <Registro 
        carrito={carrito} 
        setCarrito={setCarrito}
        eliminarProducto={eliminarProducto}
      />
    </div>
  );
}

export default App;