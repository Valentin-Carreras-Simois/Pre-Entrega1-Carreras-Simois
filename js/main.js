let productos = [];

fetch("./js/productos.json")
   .then(response => response.json())
   .then(data => {
      productos = data;
      cargarProductos(productos);
   })
   .catch(error => {
      console.log('Error al obtener los datos de productos:', error);
   });

const contenedorProductos = document.querySelector("#contenedor-productos");
const menuCategorias = document.querySelectorAll(".menu-categoria");
const tituloPagina = document.querySelector("#titulo-pagina");
let botonesAgregar = document.querySelectorAll(".producto-boton")
const cuenta = document.querySelector("#cuenta");

function cargarProductos(productoCategoria) {
   contenedorProductos.innerHTML = "";

   productoCategoria.forEach(producto => {
      const article = document.createElement("article");
      article.classList.add("main_article__producto");
      article.innerHTML = `
         <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
         <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-boton" id="${producto.id}">Agregar</button>
         </div>
      `;

      contenedorProductos.appendChild(article);

   });

   actualizarBotonesAgregar();
}

function actualizarTituloCategoria(categoria) {
   tituloPagina.textContent = categoria;
}

menuCategorias.forEach(boton => {
   boton.addEventListener("click", (e) => {
      menuCategorias.forEach(boton => boton.classList.remove("active"));
      e.currentTarget.classList.add("active");

      if (e.currentTarget.id != "b-total") {
         const categoriaSeleccionada = e.currentTarget.textContent;
         const productosElegidos = productos.filter(producto => producto.categoria === categoriaSeleccionada);
         cargarProductos(productosElegidos);
         actualizarTituloCategoria(categoriaSeleccionada);
      } else {
         cargarProductos(productos);
         actualizarTituloCategoria("Todos los productos");
      }
   });
});

function actualizarBotonesAgregar() {
   botonesAgregar = document.querySelectorAll(".producto-boton");

   botonesAgregar.forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
   });
}

const productosEnCarrito = [];

function agregarAlCarrito(e) {

   Toastify({
        text: "Agregado al carrito!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ba181b, #a4161a)",
          fontSize: "2rem"
        },
        offset: {
         x: "1.5rem",
         y: "1.5rem"
       },
        onClick: function(){} // Callback after click
    }).showToast();
   const idBoton = e.currentTarget.id;
   const productoSeleccionado = productos.find(producto => producto.id === idBoton);

   if (productosEnCarrito.some(producto => producto.id === idBoton)) {
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;
   } else {
      productoSeleccionado.cantidad = 1;
      productosEnCarrito.push(productoSeleccionado);
   }

   actualizarCuenta();

   localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCuenta() {
   let nuevaCuenta = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
   cuenta.innerText = nuevaCuenta;
}