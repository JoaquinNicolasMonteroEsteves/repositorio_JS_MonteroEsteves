const container = document.getElementById("container")
const inputBuscador = document.getElementById("buscador")

function cardPokemon (pokemon) {
    return `<label>
                <input type="checkbox" class="card-pokemon" name="pokecard" value="${pokemon.id}"/>
                <div class="card">
                    <div class="slide slide0">
                        <button type="button" class="botonesCarrito"><img src="./Imagenes/pokebola.png" class="imagenCarrito"></button>
                    </div>
                    <div class="slide slide1 ${pokemon.bTipo}" id="card${pokemon.id}">
                        <div class="card-nombre"><h2>${pokemon.nombre}</h2></div>
                        <div class="card-imagen"><img id="imagen-pokemon" src=${pokemon.imagen}></div>
                    </div>
                    <div class="slide slide2">
                        <div class="caracteristica">
                            <ul>
                                <li>Tipo: ${pokemon.tipo}</li>
                                <li>Ataque favorito: ${pokemon.ataqueFavorito}</li>
                                <li>Evolución/es: ${pokemon.evolucion}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </label>`
}

function cargarPokemones (array) {
    let contenido = ""
        if(array.length > 0) {
            array.forEach (pokemon => {
                contenido += cardPokemon(pokemon)
            })
            container.innerHTML = contenido
        }
}
cargarPokemones(pokemones)

// function filtrarPokemonesNombre () {
//     if (inputBuscador.ariaValueMax.trim() !== "")

// }

// function mostrarSeleccionado () {
//     const seleccionado = document.querySelector("input:checked")
//     if (seleccionado.length >= 1 && seleccionado.length < 6) {
//         let a = pokemones.find(encontrado => encontrado.id === parseInt(seleccionado.value))
//         equipo.push(a)
//         return equipo
//     } else if (seleccionado.length < 1) {
//         console.log("Por favor, seleccione uno o más pokemones")
//     } else if (seleccionado.length > 5) {
//         console.log("No puede seleccionar más de 5 pokemones")
//     }
// }

// function seleccionados () {
//     let cartas = document.querySelectorAll('input[name="pokecard"]:checked')
//     if (cartas.length < 6) {
//         cartas.forEach(elegido => {
//             let encontrado = pokemones.find(a = a.id === elegido.value)
//             equipo.push(encontrado)
//             console.table(equipo)
//         })
//     } else {
//         alert("No puede seleccionar más de 5 pokemones!")
//     }
// }
// seleccionados()





// function Pokedex() {
//     pokemonRepetido.innerText = ""
//     let pokemonElegido = prompt("Ingrese el nombre del pokemon a elegir")
//         if (pokemonElegido == null) {
//             return
//         } else {}
//     pokemonElegido = pokemonElegido.toLowerCase().trim()
//     let existir = pokemones.find((pokemon) => pokemon.nombre.toLowerCase() === pokemonElegido)

//         if (existir !== undefined) {
//             imagen.src = `./Imagenes/${existir.nombre}.jpg` 
//             container.innerHTML = mostrarPokemon(existir)
//             let existe = buscados.find((buscar) => buscar === existir.nombre)
//                 if (existe == undefined) {
//                     buscados.push(existir.nombre)
//                 } else {
//                     pokemonRepetido.innerText = `❗ALERTA ${existir.nombre} ya fue buscado previamente.`
//                 }            
//             listarBuscados()
//         } else {
//             imagen.src = `./Imagenes/pokebolaGrande.png`
//             container.innerHTML = `<p>${pokemonElegido[0].toUpperCase() + pokemonElegido.substring(1)} no se encuentra en la lista</p>`
//     }
// }

