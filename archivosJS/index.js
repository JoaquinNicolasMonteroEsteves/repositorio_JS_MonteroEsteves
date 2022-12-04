const container = document.getElementById("container")
const inputBuscador = document.getElementById("buscador")
const opcionesFiltro = document.getElementById("opcionesFiltro")
const ntitulo = document.getElementById("nBuscadosTitulo")
const ncontainer = document.getElementById("nBuscados")
const ttitulo = document.getElementById("tBuscadosTitulo")
const tcontainer = document.getElementById("tBuscados")
const btnBuscados = document.getElementById("btnBuscados")
const btnStorage = document.getElementById("btnStorage")
const btnLimpiar = document.getElementById("btnLimpiar")


let cardPokemon = (pokemon) => {
    return `<div class="card">
                <div class="slide slide0">
                    <div class="costados izquierda">
                        <img src="./Imagenes/pokebolaVacia.png" class="imagenCarrito">
                    </div>
                    <div class="costados derecha">
                        <button type="button" class="botonesEquipo" id="${pokemon.id}"><img src="./Imagenes/pokebola.png" class="imagenCarrito"></button>
                    </div>
                </div>
                <div class="slide slide1 ${pokemon.bTipo}" id="card${pokemon.id}">
                    <div class="card-nombre"><h2>${capitalize(pokemon.nombre)}</h2></div>
                    <img id="imagen-pokemon" src=${pokemon.imagen}>
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

let cardPokemonBuscado = (pokemon) => {
    return `<div class="card resultado">
                <div class="slide slide1 ${pokemon.bTipo}" id="card${pokemon.id}">
                    <div class="card-nombre"><h2>${capitalize(pokemon.nombre)}</h2></div>
                    <img id="imagen-pokemon" src=${pokemon.imagen}>
                </div>    
            </div>`
}

let capitalize = (x) => {
    let letraInicial = x.substring(0,1)
    let resto = x.substring(1, x.length)
    return (letraInicial.toUpperCase() + resto)
}

let cargarPokemones = (array) => {
    let contenido = ""
        if(array.length > 0) {
            array.forEach (pokemon => {
                contenido += cardPokemon(pokemon)
            })
            container.innerHTML = contenido
        }
}
cargarPokemones(pokemones)

let btnInteraccion = document.querySelectorAll("button.botonesEquipo")

let cargarPokemonesBuscados = (array, banner, elemento, filtro) => {
    let titulo = ""
    let contenido = ""
        if(array.length > 0) {
            array.forEach (pokemon => {
                titulo = `<h2>POR ${filtro}</h2>`
                contenido += cardPokemonBuscado(pokemon)
            })
            banner.innerHTML = titulo
            elemento.innerHTML = contenido
        }
}

let alertaBuscador = (a) => {
    switch(a) {
    case 1:
        swal("No se han hayado coincidencias", "Intente nuevamente, por favor", "./Imagenes/VoltorbEnojado.png", {buttons: false, timer: 2500})
        break
    case 2:
        swal("Búsqueda fallida", "Elija un filtro, por favor", "./Imagenes/JigglypuffEnojado.png", {buttons: false, timer: 2500},)
        break
    }
    inputBuscador.value = ""
    cargarPokemones(pokemones)
}

let limpiarBuscados = () => {
    tcontainer.innerHTML = ""
    ttitulo.innerHTML = ""
    ncontainer.innerHTML = ""
    ntitulo.innerHTML = ""
    btnLimpiar.classList.add("hidden")
}
btnLimpiar.addEventListener("click", limpiarBuscados)

let mostrarFiltradoNombre = () => {
    let resultado = pokemones.filter(pokemon => pokemon.nombre.includes(inputBuscador.value.toLowerCase().trim()))
    if (resultado.length > 0) {
        resultado.forEach(x => {
            if((buscadosNombre.some(y => y.nombre === x.nombre)) === false){
                buscadosNombre.push(x)
            }
        })
        sessionStorage.setItem("Buscados-Nombre", JSON.stringify(buscadosNombre))
        container.innerHTML = `<img src="./Imagenes/EsperaPokeballNegroYBlancoNF.gif" class="imagen-carga">`
        setTimeout(() => {
            cargarPokemones(resultado)
        }, parseInt(resultado.length)*350)
        btnInteraccion = document.querySelectorAll("button.botonesEquipo")
        mostrarBtnLimpiarStorage()
    } else {
        alertaBuscador(1)
    }
}

let mostrarFiltradosTipo = () => {
    let resultado = pokemones.filter(pokemon => pokemon.bTipo.includes(inputBuscador.value.toLowerCase().trim()))
    if (resultado.length > 0) {
        resultado.forEach(x => {
            if((buscadosTipo.some(y => y.nombre === x.nombre)) === false) {
                buscadosTipo.push(x)
            }
        })
        sessionStorage.setItem("Buscados-Tipo", JSON.stringify(buscadosTipo))
        container.innerHTML = `<img src="./Imagenes/EsperaPokeballNegroYBlancoNF.gif" class="imagen-carga">`
        setTimeout(() => {
            cargarPokemones(resultado)
        }, parseInt(resultado.length)*350)
        btnInteraccion = document.querySelectorAll("button.botonesEquipo")
        mostrarBtnLimpiarStorage()
    } else {
        alertaBuscador(1)
    }
}

let filtrarPokemonesNombre = () => {
        if (inputBuscador.value.trim() !== "" && opcionesFiltro.value === "nombre") {
            mostrarFiltradoNombre()
        } else if (inputBuscador.value.trim() !== "" && opcionesFiltro.value === "bTipo") {
            mostrarFiltradosTipo()
        } else if (opcionesFiltro.value === "vacio") {
            alertaBuscador(2)
            cargarPokemones(pokemones)
        } else {
            cargarPokemones(pokemones)
            btnInteraccion = document.querySelectorAll("button.botonesEquipo")
        }
        btnInteraccion = document.querySelectorAll("button.botonesEquipo")
        interaccionPokemon()
        limpiarBuscados()
}
inputBuscador.addEventListener("search", filtrarPokemonesNombre)

let mostrarBuscados = () => {
    if((sessionStorage.getItem("Buscados-Nombre")) || (sessionStorage.getItem("Buscados-Tipo")) !== null) {
        if ((sessionStorage.getItem("Buscados-Nombre")) !== null) {
            let bnombre = JSON.parse(sessionStorage.getItem("Buscados-Nombre"))
            cargarPokemonesBuscados(bnombre, ntitulo, ncontainer, "NOMBRE")
        }
        if ((sessionStorage.getItem("Buscados-Tipo")) !== null) {
            let btipo = JSON.parse(sessionStorage.getItem("Buscados-Tipo"))
            cargarPokemonesBuscados(btipo, ttitulo, tcontainer, "TIPO")
        }
    btnLimpiar.classList.remove("hidden")
    } else {
        swal("No hay historial", "Realice una búsqueda antes, por favor", "./Imagenes/noStorage.gif", {buttons: false, timer: 2500})
    }
}
btnBuscados.addEventListener("click", mostrarBuscados)

let limpiarStorage = () => {
    sessionStorage.clear("Buscados-Nombre")
    sessionStorage.clear("Buscados-Tipo")
    limpiarBuscados()
    btnStorage.classList.add("hidden")
}

let mostrarBtnLimpiarStorage = () => {
    if ((sessionStorage.getItem("Buscados-Nombre")) || (sessionStorage.getItem("Buscados-Tipo")) !== null) {
        btnStorage.classList.remove("hidden")
        btnStorage.addEventListener("click", limpiarStorage)
    }
}
mostrarBtnLimpiarStorage()

let interaccionPokemon = () => {
    btnInteraccion.forEach(btn => {
        btn.addEventListener("click", () => {
            let encontrado = pokemones.find(pokemon => pokemon.id === parseInt(btn.id))
            alertaMolestado(encontrado)
        })
    })
}
interaccionPokemon()

let alertaMolestado = (x) => {
    swal("Acabás de molestar a " + capitalize(x.nombre), "", "./Imagenes/" + capitalize(x.nombre) + ".png", {
        buttons: {
          cancel: "¡Escapar!",
          catch: {text: "¡Arrojar Pokebola!",value: "catch"},
          defeat: {text:"Derrotar",} 
        },
        }
        )
    .then((value) => {
        switch (value) {
          case "defeat":
            swal(capitalize(x.nombre) + " fue derrotado", "¡Ganaste 500XP!", "./Imagenes/PokemonDerrotado.gif");
            break;
          case "catch":
            swal("¡¡Atrapado!!","¡" + capitalize(x.nombre) + " fue agregado a tu equipo exitosamente!", "./Imagenes/PokemonAtrapado.gif");
            break;
          default:
            swal("¡Zafaste!", "", "./Imagenes/PokemonEscape.gif");}
    });
}