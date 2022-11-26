function cardPokemon (pokemon) {
    return `<div class="card">
                <div class="slide slide1 ${pokemon.bg}" id="card${pokemon.id}">
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
            </div>`
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
 function bla () {
    return "Hola como\nestas?"
 }





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

