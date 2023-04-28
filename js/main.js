let usuario = prompt("Ingresa tu nombre de usuario");

while (usuario === "") {
    alert("Error! No ingresaste un nombre de usuario");
    usuario = prompt("Ingresa un nombre de usuario esta vez");
}
if (usuario !== "") {
    alert("Bienvenido " + usuario + "!");
}

const MONEDAS = [
  { nombre: "Dólar", constante: 96.45 },
  { nombre: "Euro", constante: 114.60 },
  { nombre: "Real", constante: 18.29 },
];

function convertir() {
  const moneda = document.getElementById("moneda").value;
  const cantidad = document.getElementById("cantidad").value;

  const constante = MONEDAS.find((m) => m.nombre === moneda).constante;
  const resultado = (cantidad / constante).toFixed(2);

  alert("El resultado de la conversión es: " + resultado);
}