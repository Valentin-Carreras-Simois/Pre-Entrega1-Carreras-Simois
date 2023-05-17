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
      
        const botonAgregar = article.querySelector(".producto-boton");
        botonAgregar.addEventListener("click", () => {
          const productoId = botonAgregar.id;
          const productoSeleccionado = productos.find(producto => producto.id === productoId);
          agregarProductoAlCarrito(productoSeleccionado);
        });
      });

    actualizarBotonesAgregar();
}

function actualizarTituloCategoria(categoria) {
    tituloPagina.textContent = categoria;
}

cargarProductos(productos);

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

function actualizarBotonesAgregar (){
    botonesAgregar = document.querySelectorAll(".producto-boton");

    botonesAgregar.forEach(boton => {

        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = [];

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    console.log(productoAgregado);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarCuenta();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCuenta(){
    let nuevaCuenta = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    cuenta.innerText = nuevaCuenta;
}































// const productos = [
//     {
//         id: "camiseta_bos",
//         titulo: "Camiseta Boston Celtics 2023",
//         imagen: "./img/camiseta-boston.webp",
//         categoria:{
//             nombre: "Camisetas",
//             id: "camisetas",
//         },
//         precio: 20000
//     },
//     {
//         id: "camiseta_tor",
//         titulo: "Camiseta Toronto Raptors",
//         imagen: "./img/camiseta-toronto.webp",
//         categoria:{
//             nombre: "Camisetas",
//             id: "camisetas",
//         },
//         precio: 18000
//     },
//     {
//         id: "camiseta_phx",
//         titulo: "Camiseta Phoenix Suns 2023",
//         imagen: "./img/camiseta-phoenix.webp",
//         categoria:{
//             nombre: "Camisetas",
//             id: "camisetas",
//         },
//         precio: 19000
//     },
//     {
//         id: "camiseta_mia",
//         titulo: "Camiseta Miami Heat 2023",
//         imagen: "./img/camiseta-miami.webp",
//         categoria:{
//             nombre: "Camisetas",
//             id: "camisetas",
//         },
//         precio: 18000
//     },
//     {
//         id: "campera_chi",
//         titulo: "Chicago Bulls Jacket 90's",
//         imagen: "./img/campera-chicago.webp",
//         categoria:{
//             nombre: "Camperas",
//             id: "camperas",
//         },
//         precio: 37000
//     },
//     {
//         id: "campera_orl",
//         titulo: "Orlando Magic Jacket 90's",
//         imagen: "./img/campera-orlando.webp",
//         categoria:{
//             nombre: "Camperas",
//             id: "camperas",
//         },
//         precio: 30000
//     },
//     {
//         id: "campera_phi",
//         titulo: "Philadelphia 76ers Jackets 90's",
//         imagen: "./img/campera-philadelphia.webp",
//         categoria:{
//             nombre: "Camperas",
//             id: "camperas",
//         },
//         precio: 45000
//     },
//     {
//         id: "campera_jor",
//         titulo: "Chaqueta bomber Air Jordan",
//         imagen: "./img/campera-jordan.webp",
//         categoria:{
//             nombre: "Camperas",
//             id: "camperas",
//         },
//         precio: 37000
//     },
    
// ]

// const contenedorProductos = document.querySelector("#contenedor-productos");
// const menuCategorias = document.querySelectorAll(".menu-categoria");

// function cargarProductos(productoCategoria) {

//     contenedorProductos.innerHTML = "";

//     productoCategoria.forEach(producto => {

//         const article = document.createElement("article");
//         article.classList.add("main_article__producto");
//         article.innerHTML = `
//             <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
//             <div class="producto-detalles">
//                 <h3 class="producto-titulo">${producto.titulo}</h3>
//                 <p class="producto-precio">$${producto.precio}</p>
//                 <button class="producto-boton" id="${producto.id}">Agregar</button>
//             </div>
//         `;

//         contenedorProductos.append(article);
//     })

// }

// cargarProductos(productos);

// menuCategorias.forEach(boton => {

//     boton.addEventListener("click", (e) => {

//         menuCategorias.forEach(boton => boton.classList.remove("active"));
//         e.currentTarget.classList.add("active");

//         const productosElegidos = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
//         cargarProductos(productosElegidos);
//     })
// })