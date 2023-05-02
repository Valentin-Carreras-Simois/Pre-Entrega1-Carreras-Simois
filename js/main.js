let usuario = prompt("Ingresa tu nombre de usuario");

while (usuario === "") {
    alert("Error! No ingresaste un nombre de usuario");
    usuario = prompt("Ingresa un nombre de usuario esta vez");
}
if (usuario !== "") {
    alert("Bienvenido " + usuario + "!");
}

const campeones = [
  {
    nombre: "Argentina",
    cantidad: "3 veces"
  },
  {
    nombre: "Alemania",
    cantidad: "4 veces"
  },
  {
    nombre: "Brasil",
    cantidad: "5 veces"
  },
  {
    nombre: "España",
    cantidad: "1 vez"
  },
  {
    nombre: "Francia",
    cantidad: "2 veces"
  },
  {
    nombre: "Inglaterra",
    cantidad: "1 vez"
  },
  {
    nombre: "Italia",
    cantidad: "4 veces"
  },
  {
    nombre: "Uruguay",
    cantidad: "2 veces"
  }
];

function buscar() {
  const pais = document.getElementById("paises").value;
  const paisEncontrado = campeones.find(p => p.nombre.toLowerCase() === pais.toLowerCase());

  if (paisEncontrado) {
    alert("Sí, " + paisEncontrado.nombre + " ha ganado la copa del mundo " + paisEncontrado.cantidad + "!");
  } else {
    alert("Lo siento, " + pais + " no ha ganado la copa del mundo.");
  }
}
