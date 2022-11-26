function restaurarImagen () {
    imagen.src = "./Imagenes/pokebolaGrande.png"
    container.innerHTML = ""
    pokemonRepetido.innerText = ""
}

function restaurarHistorial () {
    const listado = document.getElementById("pokemonBuscados")
        listado.innerHTML = ""
    pokemonRepetido.innerText = ""
    buscados.splice(0, buscados.length)
}