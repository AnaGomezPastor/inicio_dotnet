import { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [editando, setEditando] = useState(null);

  // Cargar productos
  useEffect(() => {
    fetch("http://localhost:5112/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  // Agregar producto
  const agregarProducto = async (e) => {
    e.preventDefault();
    const nuevo = { nombre, precio: parseFloat(precio) };

    if (editando) {
      // 🔹 Editar
      await fetch(`http://localhost:5112/api/productos/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      setProductos(
        productos.map((p) =>
          p.id === editando.id ? { ...p, ...nuevo } : p
        )
      );
      setEditando(null);
    } else {
      // 🔹 Agregar nuevo
      const res = await fetch("http://localhost:5112/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });
      const data = await res.json();
      setProductos([...productos, data]);
    }

    setNombre("");
    setPrecio("");
  };

  // 🔹 Eliminar producto
  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:5112/api/productos/${id}`, {
      method: "DELETE",
    });
    setProductos(productos.filter((p) => p.id !== id));
  };

  // 🔹 Editar producto (cargar datos al formulario)
  const iniciarEdicion = (producto) => {
    setEditando(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Productos</h1>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio.toFixed(2)}{" "}
            <button onClick={() => iniciarEdicion(p)}>✏️</button>
            <button onClick={() => eliminarProducto(p.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <h2>{editando ? "Editar producto" : "Agregar producto"}</h2>
      <form onSubmit={agregarProducto}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit">
          {editando ? "Guardar cambios" : "Agregar"}
        </button>
        {editando && (
          <button
            type="button"
            onClick={() => {
              setEditando(null);
              setNombre("");
              setPrecio("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default App;
