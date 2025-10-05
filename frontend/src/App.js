import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import {
  getProductos,
  addProducto,
  updateProducto,
  deleteProducto,
} from "./services/api";

/**
 * Componente principal de la aplicación.
 * - Carga los productos al iniciar.
 * - Administra el estado de los productos y el producto en edición.
*/
function App() {
  // Estado con todos los productos
  const [productos, setProductos] = useState([]);

  // Estado para saber si estamos editando un producto (o no)
  const [editando, setEditando] = useState(null);

  /**
   * useEffect se ejecuta solo una vez al montar el componente.
   * Carga los productos desde el backend.
  */
  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  /**
   * Agrega o actualiza un producto según el estado "editando".
  */
  const handleAddOrEdit = async (producto) => {
    if (editando) {
      // Si hay un producto en edición, lo actualizamos
      await updateProducto(editando.id, producto);
      setProductos((prev) =>
        prev.map((p) => 
          p.id === editando.id ? { ...p, ...producto } : p
        )
      );
      setEditando(null);
    } else {
      // Si no, agregamos un nuevo producto
      const nuevo = await addProducto(producto);
      setProductos((prev) => [...prev, nuevo]);
    }
  };

  /**
   * Elimina un producto por ID.
  */
  const handleDelete = async (id) => {
    await deleteProducto(id);
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Productos</h1>

      {/* Lista de productos */}
      <ProductList
        productos={productos}
        onEdit={setEditando}
        onDelete={handleDelete}
      />

      <h2>{editando ? "Editar producto" : "Agregar producto"}</h2>

      {/* Formulario para agregar o editar */}
      <ProductForm
        onSubmit={handleAddOrEdit}
        productoEditando={editando}
        onCancel={() => setEditando(null)}
      />
    </div>
  );
}

export default App;
