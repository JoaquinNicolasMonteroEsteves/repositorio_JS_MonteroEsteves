const container = document.getElementById("container")
const imagen = document.getElementById("imagenPokemon")
const restaurar = document.getElementById("restaurarImagen")
const titulo = document.getElementById("tituloPokemon")
const intro = document.querySelector("h3")
const btn1 = document.getElementById("elegirPokemon")
const btn2 = document.getElementById("btnRestaurarImagen")
const pBuscados = document.getElementById("buscados")
const pokemonRepetido = document.getElementById("repetido")
const btn3 = document.getElementById("restaurarBusqueda")


restaurar.innerText = "Pulse el botón para restaurar la imagen y el texto."
titulo.innerText = "¡Elige tu equipo Pokemon!"
intro.innerHTML = `<p>En esta página vas a poder elegir un pokemon de la lista y observar sus características.</p>`
btn1.innerText = "Elegir pokemon de la lista"
btn1.addEventListener("click", () => {
    Pokedex()
})

btn2.innerText = "Restaurar"
btn2.addEventListener("click", () => {
    restaurarImagen()
})

pBuscados.innerText = "A continuación se listarán los pokemon buscados hasta el momento:" 
btn3.innerText = "Limpiar historial"
btn3.addEventListener("click", () => {
    restaurarHistorial()
})





