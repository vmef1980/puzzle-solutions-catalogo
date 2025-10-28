import { agregar } from './pedido.js';

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
            div.innerHTML = `
              <img src="${producto.imagen}" alt="${producto['nombre del producto']}">
              <h3>${producto['nombre del producto']}</h3>
              <p style="font-size: 0.5em; color: #FFF;">Código: ${producto.codigo}</p>
              <p>Q${producto['precio (q)']}</p>
              <p style="font-size: 0.9em; color: #555;">${producto.descripcion}</p>
              <label for="cantidad${idCounter}" style="display:block; margin-top:8px;">Cantidad:</label>
              <input type="number" id="cantidad${idCounter}" min="1" value="1" style="width: 60px;">
              <button onclick="agregar('${producto['nombre del producto']}', ${producto['precio (q)']}, 'cantidad${idCounter}', '${producto.codigo}')">Agregar</button>
            `;
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

