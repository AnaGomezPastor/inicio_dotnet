import { useState, useEffect } from "react";

/**
 * Formulario de producto.
 * Se usa tanto para agregar como para editar.
 *
 * @param {Function} onSubmit - Se ejecuta cuando se envía el formulario.
 * @param {Object|null} productoEditando - Si existe, el formulario se llena con sus datos.
 * @param {Function} onCancel - Se ejecuta al cancelar la edición.
 */
function ProductForm({ onSubmit, productoEditando, onCancel }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");

    // si estamos editando, carga los valores del producto que hemos seleccionado
    useEffect(() => {
        if (productoEditando) {
            setNombre(productoEditando.nombre);
            setPrecio(productoEditando.precio);
        } else {
            // si no hay un producto seleccionado, limpiamos el formulario
            setNombre("");
            setPrecio("");
        }
    }, [productoEditando]);

    // envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nombre, precio: parseFloat(precio) });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Campo: nombre del producto */}
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />

            {/* Campo: precio del producto */}
            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
            />

            {/* Botones de acción */}
            <button type="submit">
                {productoEditando ? "Guardar cambios" : "Agregar"}
            </button>

            {/* Solo aparece el botón Cancelar cuando estamos editando */}
            {productoEditando && (
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
            )}
        </form>
    );
}

export default ProductForm;