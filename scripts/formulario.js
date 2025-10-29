// pedido.js

// Lista de productos agregados al pedido
export const pedido = [];

// Total acumulado del pedido
export let total = 0;

// Función para agregar un producto al pedido
export function agregarProducto(producto) {
  const existente = pedido.find(p => p.codigo === producto.codigo);
  if (existente) {
    existente.cantidad += producto.cantidad;
  } else {
    pedido.push({ ...producto });
  }
  actualizarTotal();
}

// Función para recalcular el total
export function actualizarTotal() {
  total = pedido.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
}

// Función opcional para limpiar el pedido
export function limpiarPedido() {
  pedido.length = 0;
  total = 0;
}
