/**
 * Muestra la lista de productos con botones de editar y eliminar.
 *
 * @param {Array} productos - Lista de productos [{id, nombre, precio}]
 * @param {Function} onEdit - Función que se ejecuta al hacer clic en "✏️"
 * @param {Function} onDelete - Función que se ejecuta al hacer clic en "🗑️"
 */
function ProductList({ productos, onEdit, onDelete }) {
    return (
        <ul>
            {productos.map((p) => (
                <li key={p.id}>
                    {p.nombre} - {p.precio.toFixed(2)}{" "} €
                    <button onClick={() => onEdit(p)}>✏️</button>
                    <button onClick={() => onDelete(p.id)}>🗑️</button>
                </li>
            ))}
        </ul>
    );
}

export default ProductList;