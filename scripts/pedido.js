// pedido.js

// Lista de productos agregados al pedido
export const pedido = [];

// Total acumulado del pedido
export let total = 0;

/**
 * Agrega un producto al pedido.
 * @param {Object} producto - El producto a agregar.
 * @param {string} producto.codigo - Código único del producto.
 * @param {string} producto.nombre - Nombre del producto.
 * @param {number} producto.precio - Precio unitario.
 * @param {number} producto.cantidad - Cantidad deseada.
 */
export function agregarProducto(producto) {
  const existente = pedido.find(p => p.codigo === producto.codigo);
  if (existente) {
    existente.cantidad += producto.cantidad;
  } else {
    pedido.push({ ...producto });
  }
  actualizarTotal();
}

/**
 * Recalcula el total del pedido.
 */
export function actualizarTotal() {
  total = pedido.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
}

/**
 * Limpia el pedido y reinicia el total.
 */
export function limpiarPedido() {
  pedido.length = 0;
  total = 0;
}
