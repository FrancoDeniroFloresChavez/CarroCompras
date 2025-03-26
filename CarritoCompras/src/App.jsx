import "./App.css";
import Carta from "./Carrito/Carta";
import Registro from "./Carrito/Registro";
import { useState } from "react";

function App() {
  const [carrito, setCarrito] = useState([]);

  return (
    <div className="contenedor-app">
      <Carta setCarrito={setCarrito} />
      <Registro carrito={carrito} />
    </div>
  );
}

export default App;
