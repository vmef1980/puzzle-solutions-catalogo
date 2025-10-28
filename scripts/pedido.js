export function agregar(nombre, precio, input, codigo) {
  if (!input || !(input instanceof HTMLInputElement)) {
    console.warn("Input inválido o no encontrado:", input);
    return;
  }

  const cantidad = parseInt(input.value);
  if (isNaN(cantidad) || cantidad < 1) return;

  const lista = document.getElementById("listaPedido");
  const item = document.createElement("li");
  item.textContent = `${cantidad} x ${nombre} (Q${precio}) - Código: ${codigo}`;
  lista.appendChild(item);

  const total = document.getElementById("total");
  const actual = parseFloat(total.textContent);
  total.textContent = (actual + precio * cantidad).toFixed(2);

  const resumen = document.getElementById("pedidoLista");
  const resumenItem = document.createElement("li");
  resumenItem.textContent = `${cantidad} x ${nombre}`;
  resumen.appendChild(resumenItem);

  const resumenTotal = document.getElementById("pedidoTotal");
  const actualResumen = parseFloat(resumenTotal.textContent.replace("Total: Q", ""));
  resumenTotal.textContent = `Total: Q${(actualResumen + precio * cantidad).toFixed(2)}`;

  document.getElementById("pedidoVista").style.display = "block";
}
