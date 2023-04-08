let usuario = prompt("Ingresa tu nombre de usuario");

while (usuario === "") {
    alert("Error! No ingresaste un nombre de usuario");
    usuario = prompt("Ingresa un nombre de usuario esta vez");
}
if (usuario !== "") {
    alert("Bienvenido " + usuario + "!");
}

const DOLAR = 392;

function convertir() {
  const pesos = document.getElementById("pesos").value;
  const dolares = pesos / DOLAR;
  alert(`$${pesos} pesos argentinos son US$${dolares.toFixed(2)}`);
}