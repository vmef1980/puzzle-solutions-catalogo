import { agregar } from './scripts/pedido.js';

function aplicarFiltroSubcategoria() {
  const seleccionada = document.getElementById("filtroSubcategoria").value;
  document.querySelectorAll("#catalogo > div").forEach(section => {
    const titulo = section.querySelector("h2");
    if (!seleccionada || (titulo && titulo.textContent === seleccionada)) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

fetch('data/Catalogo-v3.csv')
  .then(response => response.text())
  .then(csv => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        results.data = results.data.map(row => {
          const normalizado = {};
          Object.keys(row).forEach(key => {
            normalizado[key.trim().toLowerCase()] = row[key];
          });
          return normalizado;
        });

        const catalogo = document.getElementById("catalogo");
        const grupos = {};
        results.data.forEach(producto => {
          if (!producto || !producto.estado || producto.estado.trim().toLowerCase() !== "disponible") return;
          const cat = producto.subcategoria || "Otros";
          if (!grupos[cat]) grupos[cat] = [];
          grupos[cat].push(producto);
        });

        const filtro = document.getElementById("filtroSubcategoria");
        Object.keys(grupos).sort().forEach(subcat => {
          const option = document.createElement("option");
          option.value = subcat;
          option.textContent = subcat;
          filtro.appendChild(option);
        });
        filtro.addEventListener("change", aplicarFiltroSubcategoria);

        let idCounter = 1;
        Object.keys(grupos).forEach(subcategoria => {
          const section = document.createElement("div");
          section.innerHTML = `<h2>${subcategoria}</h2>`;
          grupos[subcategoria].forEach(producto => {
            const div = document.createElement("div");
            div.className = "producto";

            const img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = producto["nombre del producto"];

            const h3 = document.createElement("h3");
            h3.textContent = producto["nombre del producto"];

            const codigo = document.createElement("p");
            codigo.textContent = `Código: ${producto.codigo}`;
            codigo.style.fontSize = "0.5em";
            codigo.style.color = "#FFF";

            const precio = document.createElement("p");
            precio.textContent = `Q${producto["precio (q)"]}`;

            const descripcion = document.createElement("p");
            descripcion.textContent = producto.descripcion;
            descripcion.style.fontSize = "0.9em";
            descripcion.style.color = "#555";

            const label = document.createElement("label");
            label.setAttribute("for", `cantidad${idCounter}`);
            label.textContent = "Cantidad:";
            label.style.display = "block";
            label.style.marginTop = "8px";

            const input = document.createElement("input");
            input.type = "number";
            input.id = `cantidad${idCounter}`;
            input.min = "1";
            input.value = "1";
            input.style.width = "60px";

            const boton = document.createElement("button");
            boton.textContent = "Agregar";
            boton.addEventListener("click", () => {
              if (input && input instanceof HTMLInputElement) {
                agregar(
                  producto["nombre del producto"],
                  parseFloat(producto["precio (q)"]),
                  input,
                  producto.codigo
                );
              } else {
                console.warn("Input no válido o no encontrado:", input);
              }
            });

            div.appendChild(img);
            div.appendChild(h3);
            div.appendChild(codigo);
            div.appendChild(precio);
            div.appendChild(descripcion);
            div.appendChild(label);
            div.appendChild(input);
            div.appendChild(boton);

            section.appendChild(div);
            idCounter++;
          });
          catalogo.appendChild(section);
        });
      }
    });
  })
  .catch(error => {
    console.error("Error al cargar el archivo CSV:", error);
    document.getElementById("catalogo").innerHTML = "<p style='color:red;'>No se pudo cargar el catálogo.</p>";
  });

document.getElementById("busqueda").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  document.querySelectorAll(".producto").forEach(p => {
    p.style.display = p.textContent.toLowerCase().includes(texto) ? "block" : "none";
  });
});







