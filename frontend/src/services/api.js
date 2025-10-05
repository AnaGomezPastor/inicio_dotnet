// URL base de la API de .NET
const API_URL = "http://localhost:5112/api/productos";

// Obtener la lista de productos desde el backend
export const getProductos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

/** 
 *  Agregar un nuevo producto
 *  @param {object} producto - {nombre, precio}
 */ 

export const addProducto = async (producto) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
};

/** 
 * Actualizar un producto existente a través de su ID
*/

export const updateProducto = async (id, producto) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
};

/**
 * Eliminar un producto por su id
 */

export const deleteProducto = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
