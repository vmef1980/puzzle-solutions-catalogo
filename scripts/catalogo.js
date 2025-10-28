export let pedido = [];
export let total = 0;

export function agregar(nombre, precio, inputId, codigo) {
  const cantidad = parseInt(document.getElementById(inputId).value);
  if (isNaN(cantidad) || cantidad < 1) return;

  const existente = pedido.find(p => p.codigo === codigo);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    pedido.push({ nombre, precio, cantidad, codigo });
  }

  actualizarPedido();
  mostrarMensajeAgregado();
}

export function eliminarProducto(index) {
  pedido.splice(index, 1);
  actualizarPedido();
}

export function actualizarPedido() {
  const lista = document.getElementById("listaPedido");
  const detalle = document.getElementById("detallePedido");
  lista.innerHTML = "";
  detalle.innerHTML = "";
  total = 0;

  pedido.forEach((p, index) => {
    const subtotal = (p.precio * p.cantidad).toFixed(2);
    const item = document.createElement("li");
    item.innerHTML = `[${p.codigo}] ${p.nombre} x${p.cantidad} = Q${subtotal}
    <button onclick="eliminarProducto(${index})">❌</button>`;
    lista.appendChild(item);
    total += p.precio * p.cantidad;
  });

  document.getElementById("total").textContent = total.toFixed(2);

  if (pedido.length > 0) {
    const resumen = pedido.map(p => `• ${p.nombre} x${p.cantidad}`).join("<br>");
    detalle.innerHTML = `<p><strong>Productos en el pedido:</strong><br>${resumen}</p>`;
  }

  actualizarVistaPedido();
}

function mostrarMensajeAgregado() {
  const msg = document.createElement("div");
  msg.textContent = "Artículo añadido a tu pedido.";
  msg.className = "mensaje-agregado";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

function actualizarVistaPedido() {
  const lista = document.getElementById("pedidoLista");
  const totalTexto = document.getElementById("pedidoTotal");

  if (!lista || !totalTexto) return;

  lista.innerHTML = "";
  let totalVista = 0;

  pedido.forEach(p => {
    const subtotal = (p.precio * p.cantidad).toFixed(2);
    const item = document.createElement("li");
    item.textContent = `${p.nombre} x${p.cantidad} = Q${subtotal}`;
    lista.appendChild(item);
    totalVista += p.precio * p.cantidad;
  });

  totalTexto.textContent = `Total: Q${totalVista.toFixed(2)}`;
}

export function irADetallePedido() {
  const detalle = document.getElementById("detallePedido");
  const aside = document.getElementById("pedidoVista");

  if (detalle) detalle.scrollIntoView({ behavior: "smooth" });
  if (aside) aside.style.display = "none";
}