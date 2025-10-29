import { pedido, total } from 'scripts/pedido.js';

export function enviarWhatsApp() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const pago = document.getElementById("pago").value;
  const comentarios = document.getElementById("comentarios").value.trim();

  if (!nombre || !telefono || !email || !direccion || !pago) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  if (pedido.length === 0) {
    alert("No has agregado productos al pedido.");
    return;
  }

  const resumen = pedido.map(p => 
    `• ${p.nombre} x${p.cantidad} (Q${(p.precio * p.cantidad).toFixed(2)})`
  ).join("\n");

  const totalTexto = `Total: Q${total.toFixed(2)}`;

  const mensaje = `Hola, quiero hacer un pedido:\n\n${resumen}\n${totalTexto}\n\nDatos del cliente:\n• Nombre: ${nombre}\n• Teléfono: ${telefono}\n• Email: ${email}\n• Dirección: ${direccion}\n• Pago: ${pago}\n• Comentarios: ${comentarios || "Ninguno"}`;

  const url = `https://wa.me/50241084481?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  const boton = document.querySelector("button[onclick='enviarWhatsApp()']");
  if (boton) {
    boton.disabled = true;
    boton.textContent = "Pedido enviado ✅";

    setTimeout(() => {
      boton.disabled = false;
      boton.textContent = "Enviar pedido por WhatsApp";
    }, 4000);
  }

  const confirmacion = document.createElement("div");
  confirmacion.textContent = "¡Tu pedido está listo para enviar por WhatsApp!";
  confirmacion.style.position = "fixed";
  confirmacion.style.bottom = "80px";
  confirmacion.style.right = "20px";
  confirmacion.style.background = "#25D366";
  confirmacion.style.color = "white";
  confirmacion.style.padding = "12px 16px";
  confirmacion.style.borderRadius = "8px";
  confirmacion.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
  confirmacion.style.zIndex = "9999";
  document.body.appendChild(confirmacion);

  setTimeout(() => confirmacion.remove(), 4000);
}

