const productos = [
    {
        id: "camiseta_bos",
        titulo: "Camiseta Boston Celtics 2023",
        imagen: "./img/camiseta-boston.webp",
        categoria: "Camisetas",
        precio: 20000
    },
    {
        id: "camiseta_tor",
        titulo: "Camiseta Toronto Raptors",
        imagen: "./img/camiseta-toronto.webp",
        categoria: "Camisetas",
        precio: 18000
    },
    {
        id: "camiseta_phx",
        titulo: "Camiseta Phoenix Suns 2023",
        imagen: "./img/camiseta-phoenix.webp",
        categoria: "Camisetas",
        precio: 19000
    },
    {
        id: "camiseta_mia",
        titulo: "Camiseta Miami Heat 2023",
        imagen: "./img/camiseta-miami.webp",
        categoria: "Camisetas",
        precio: 18000
    },
    {
        id: "campera_chi",
        titulo: "Chicago Bulls Jacket 90's",
        imagen: "./img/campera-chicago.webp",
        categoria: "Camperas",
        precio: 37000
    },
    {
        id: "campera_orl",
        titulo: "Orlando Magic Jacket 90's",
        imagen: "./img/campera-orlando.webp",
        categoria: "Camperas",
        precio: 30000
    },
    {
        id: "campera_phi",
        titulo: "Philadelphia 76ers Jackets 90's",
        imagen: "./img/campera-philadelphia.webp",
        categoria: "Camperas",
        precio: 45000
    },
    {
        id: "campera_jor",
        titulo: "Chaqueta bomber Air Jordan",
        imagen: "./img/campera-jordan.webp",
        categoria: "Camperas",
        precio: 37000
    },
];
  
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#article_carrito__productos");
const carritoAcciones = document.querySelector("#article_carrito__acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll("carrito_producto__eliminar")
const totalElement = document.querySelector("#total");

let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

function actualizarCarrito() {
  if (productosEnCarrito.length === 0) {
    carritoVacio.classList.remove("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled");
  } else {
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    carritoComprado.classList.add("disabled");

    carritoProductos.innerHTML = "";
    let total = 0;

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
        <img class="carrito_producto__img" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito_producto__titulo">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito_producto__cantidad">
            <small>Cantidad</small>
            <h3>${producto.cantidad}</h3>
        </div>
        <div class="carrito_producto__precio">
            <small>Precio</small>
            <h3>$${producto.precio}</h3>
        </div>
        <div class="carrito_producto__subtotal">
            <small>Subtotal</small>
            <h3>$${producto.precio * producto.cantidad}</h3>
        </div>
        <button class="carrito_producto__eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
      `;

      total += producto.precio * producto.cantidad;

      carritoProductos.append(div);
    });

    totalElement.textContent = `$${total.toFixed(2)}`;

    actualizarBotonesEliminar()
  }
}

function agregarProductoAlCarrito(producto) {
  const productoExistente = productosEnCarrito.find((p) => p.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    producto.cantidad = 1;
    productosEnCarrito.push(producto);
  }

  localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
  actualizarCarrito();

  actualizarBotonesEliminar();
}

function vaciarCarrito() {

  Swal.fire({
    title: 'Estas seguro?',
    icon: 'warning',
    html:'Se borraran los productos de tu carrito.',
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:'Si',
    cancelButtonText:'Volver',
  }).then((result) => {
  if (result.isConfirmed) {
      productosEnCarrito = [];
      localStorage.removeItem("productosEnCarrito");
      actualizarCarrito();
    }
  })
}

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito_producto__eliminar");

  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(event) {

  Toastify({
    text: "Producto eliminado!",
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
  const productoId = event.currentTarget.id;
  
  productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== productoId);
  
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  
  actualizarCarrito();
}

const botonVaciar = document.querySelector(".boton-vaciar");
botonVaciar.addEventListener("click", vaciarCarrito);

const botonesAgregarCarrito = document.querySelectorAll(".boton-agregar-carrito");

botonesAgregarCarrito.forEach((boton) => {
boton.addEventListener("click", () => {
const productoId = boton.dataset.productoId;
const productoSeleccionado = productos.find((producto) => producto.id === productoId);
agregarProductoAlCarrito(productoSeleccionado);
});
});

window.addEventListener("DOMContentLoaded", () => {
actualizarCarrito();
});

const botonComprarAhora = document.querySelector(".boton-comprar");
botonComprarAhora.addEventListener("click", () => {
  Swal.fire(
    'Gracias por tu compra!',
    'El producto esta en camino!',
    'success'
  )
  carritoProductos.classList.add("disabled");
  carritoAcciones.classList.add("disabled");
  carritoComprado.classList.remove("disabled");
});