const container = document.getElementById("container")
const imagenLupa = document.getElementById("imagenLupa")
const inputBuscador = document.getElementById("buscador")
const opcionesFiltro = document.getElementById("opcionesFiltro")
const ntitulo = document.getElementById("nBuscadosTitulo")
const ncontainer = document.getElementById("nBuscados")
const btnNombreContainer = document.getElementById("btnNombreContainer")
const detallesNombre = document.getElementById("detallesNombre")
const nBody = document.getElementById("nBody")
const ttitulo = document.getElementById("tBuscadosTitulo")
const tcontainer = document.getElementById("tBuscados")
const btnTipoContainer = document.getElementById("btnTipoContainer")
const tBody = document.getElementById("tBody")
const detallesTipo = document.getElementById("detallesTipo")
const btnBuscados = document.getElementById("btnBuscados")
const btnStorage = document.getElementById("btnStorage")
const btnLimpiar = document.getElementById("btnLimpiar")
const btnLimpiarEquipo = document.getElementById("btnEquipo")
const equipoTitulo = document.getElementById("equipoTitulo")
const pnombre = document.getElementById("pnombre")
const pimagen = document.getElementById("pimagen")
const ptipo = document.getElementById("ptipo")
const pbutton = document.getElementById("pbutton")

let buscadosNombre = []
let buscadosTipo = []
let buscados = []
const equipo = []
const pokemones = []

const URL = './baseDatos/pokemones.json'

fetch(URL)
    .then((response) => data = response.json())
    .then((data) => pokemones.push(...data))
    .then(() => cargarPokemones(pokemones))
    .catch(error => container.innerHTML = swal("No se pudieron cargar correctamente los Pokemones", "Chequee la conexión con la base de datos", './Imagenes/errorCarga.gif', {buttons: {confirm: "Aceptar"}}))


let llamarStorageNombre = () => {
    if (!sessionStorage.getItem("Buscados-Nombre") == false) {
        buscadosNombre = JSON.parse(sessionStorage.getItem("Buscados-Nombre"))
    }
}
llamarStorageNombre()

let llamarStorageTipo = () => {
    if (!sessionStorage.getItem("Buscados-Tipo") == false) {
        buscadosTipo = JSON.parse(sessionStorage.getItem("Buscados-Tipo"))
    }
}
llamarStorageTipo()

let llamarStorageBuscados = () => {
    if (!sessionStorage.getItem("busquedas") == false) {
        buscados = JSON.parse(sessionStorage.getItem("busquedas"))
    }
}
llamarStorageBuscados()

let cardPokemon = (pokemon) => {
    return `<div class="card">
                <div class="slide slide0">
                    <div class="costados izquierda">
                        <img src="./Imagenes/pokebolaVacia.png" class="imagenCarrito">
                    </div>
                    <div class="costados derecha">
                        <button type="button" class="botonesEquipo" id="${pokemon.nombre}"><img src="./Imagenes/pokebola.png" class="imagenCarrito"></button>
                    </div>
                </div>
                <div class="slide slide1 ${pokemon.bTipo}" id="card${pokemon.nombre}">
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
                <div class="slide slide1 ${pokemon.bTipo}" id="card${pokemon.nombre}">
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

let btnInteraccion = document.querySelectorAll("button.botonesEquipo")

let interaccionPokemon = () => {
    btnInteraccion.forEach(btn => {
        btn.addEventListener("click", () => {
            let encontrado = pokemones.find(pokemon => pokemon.nombre === btn.id)
            alertaMolestado(encontrado)
        })
    })
}

let btnEquipo = document.querySelectorAll("button.tbutton")

let liberacionPokemon = () => {
    btnEquipo.forEach(btn => {
        btn.addEventListener("click", () => {
                btn.children[0].src = `./Imagenes/pokebolaAbierta.png`
                btn.animate([
                    {transform: 'translateY(-60px)'},
                    {transform: 'scale(2.5)'}
                ], {
                    duration: 1900,
                })
                setTimeout( () => {
                    let coincidencia = equipo.findIndex(pokemon => pokemon.nombre === btn.id)
                    swal(capitalize(`${equipo[coincidencia].nombre}`)+ " fue liberado...", "...nos volveremos a encontrar!", "./Imagenes/pokemonLiberado.gif")
                    equipo.splice(coincidencia, 1),
                    cargarEquipoPokemon(equipo)
                }, 1500)
        })
    })
    
}

let cargarEquipoPokemon = (muchachos) => {
    let fila1 = ""
    let fila2 = ""
    let fila3 = ""
    let fila4 = ""
    let titulo = ""
    if (muchachos.length > 0) {
        muchachos.forEach(muchacho => {
            fila1 += `<td class="tnombre">${capitalize(muchacho.nombre)}</td>`
            fila2 += `<td class="${muchacho.bTipo}"><div class="content"><img src="${muchacho.imagen}" class="img-equipo"></div></td>`
            fila3 += `<td><img src="./Imagenes/Tipos/Tipos/${muchacho.bTipo}.png" class="content"></td>`
            fila4 += `<td class="buttontd"><div class="buttonContainer"><button id="${muchacho.nombre}" class="tbutton"><img src="./Imagenes/pokebola.png"></button></div></td>`
        })
        titulo = `<h2 class="tituloBanner">EQUIPO ESCOGIDO</h2>`
    
    }
    equipoTitulo.innerHTML = titulo
    pnombre.innerHTML = fila1
    pimagen.innerHTML = fila2
    ptipo.innerHTML = fila3
    pbutton.innerHTML = fila4
    btnEquipo = document.querySelectorAll("button.tbutton")
    liberacionPokemon()
    mostrarLimpiarEquipo()
}

let tbutton = document.getElementsByClassName("tbutton")

let cargarPokemones = (array) => {
    let contenido = ""
        if(array.length > 0) {
            array.forEach (pokemon => {
                contenido += cardPokemon(pokemon)
            })
            container.innerHTML = contenido
            btnInteraccion = document.querySelectorAll("button.botonesEquipo")
            interaccionPokemon()
        }
}

let cargarPokemonesBuscados = (array, banner, elemento, detalle, filtro) => {
    let titulo = ""
    let contenido = ""
    let boton = ""
            array.forEach (pokemon => {
                titulo = `<h2 class="tituloBanner">POR ${filtro}</h2>`
                contenido += cardPokemonBuscado(pokemon)
                boton = `<button id="btn${filtro}">Ver detalles</button>`
            })
            banner.innerHTML = titulo
            elemento.innerHTML = contenido
            detalle.innerHTML = boton 
            
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
    ntitulo.innerHTML = ""
    ncontainer.innerHTML = ""
    btnNombreContainer.innerHTML = ""
    nBody.innerHTML = ""
    ttitulo.innerHTML = ""
    tcontainer.innerHTML = ""
    btnTipoContainer.innerHTML = ""
    tBody.innerHTML = ""
    btnLimpiar.classList.add("hidden")
}
btnLimpiar.addEventListener("click", limpiarBuscados)

let limpiarEquipo = () => {
    equipo.splice(0, (equipo.length))
    cargarEquipoPokemon(equipo)
    btnLimpiarEquipo.classList.add("hidden")
    swal("Todos los pokemones fueron liberados", "¡Tengan una buena vida amigos!", "./Imagenes/pokemonesLiberados.gif", {timer: 3300, showConfirmButon: false})
}

let mostrarLimpiarEquipo = () => {
    if(equipo.length > 0) {
        btnLimpiarEquipo.classList.remove("hidden")
        btnLimpiarEquipo.addEventListener("click", limpiarEquipo)
    } else {
        btnLimpiarEquipo.classList.add("hidden")
    }
}
mostrarLimpiarEquipo()

let mostrarFiltradoNombre = () => {
    let resultado = pokemones.filter(pokemon => pokemon.nombre.includes(inputBuscador.value.toLowerCase().trim()))
    if (resultado.length > 0) {
        resultado.forEach(x => {
            if((buscadosNombre.some(y => y.nombre === x.nombre)) === false){
                buscadosNombre.push(x)
            }
        })
        sessionStorage.setItem("Buscados-Nombre", JSON.stringify(buscadosNombre))
        // debugger
        let nombres = ""
        // buscadosNombre.forEach(a => {nombres += (capitalize(a.nombre) + "/")})
        // let i = parseInt(Buscados.length) + 1
        resultado.forEach(a => {nombres += (capitalize(a.nombre) + " ")})
        let pokebusqueda = new Busqueda (inputBuscador.value, opcionesFiltro.value, resultado.length, nombres)
        buscados.push(pokebusqueda)
        sessionStorage.setItem("busquedas", JSON.stringify(buscados))
        container.innerHTML = `<img src="./Imagenes/EsperaPokeballNegroYBlancoNF.gif" class="imagen-carga">`
        setTimeout(() => {
            cargarPokemones(resultado)
        }, parseInt(resultado.length)*200)
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

        let nombres = ""
        resultado.forEach(a => {nombres += (capitalize(a.nombre) + " ")})
        let poksbuqueda = new Busqueda (inputBuscador.value, opcionesFiltro.value, resultado.length, nombres)
        buscados.push(poksbuqueda)
        sessionStorage.setItem("busquedas", JSON.stringify(buscados))
        container.innerHTML = `<img src="./Imagenes/EsperaPokeballNegroYBlancoNF.gif" class="imagen-carga">`
        setTimeout(() => {
            cargarPokemones(resultado)
        }, parseInt(resultado.length)*200)
        mostrarBtnLimpiarStorage()
    } else {
        alertaBuscador(1)
    }
}

let filtrarPokemones = () => {
        if (inputBuscador.value.trim() !== "" && opcionesFiltro.value === "nombre") {
            mostrarFiltradoNombre()
        } else if (inputBuscador.value.trim() !== "" && opcionesFiltro.value === "bTipo") {
            mostrarFiltradosTipo()
        } else if (opcionesFiltro.value === "vacio") {
            alertaBuscador(2)
            cargarPokemones(pokemones)
        } else {
            cargarPokemones(pokemones)
        }
        limpiarBuscados()
}
inputBuscador.addEventListener("search", filtrarPokemones)
imagenLupa.addEventListener("click", filtrarPokemones)

let mostrarBuscados = () => {
    if((sessionStorage.getItem("Buscados-Nombre")) || (sessionStorage.getItem("Buscados-Tipo")) !== null) {
        if ((sessionStorage.getItem("Buscados-Nombre")) !== null) {
            let bnombre = JSON.parse(sessionStorage.getItem("Buscados-Nombre"))
            buscados = JSON.parse(sessionStorage.getItem("busquedas"))
            cargarPokemonesBuscados(bnombre, ntitulo, ncontainer, btnNombreContainer, "NOMBRE")
            detallesBuscados("btnNOMBRE","nombre", nBody)
        }
        if ((sessionStorage.getItem("Buscados-Tipo")) !== null) {
            let btipo = JSON.parse(sessionStorage.getItem("Buscados-Tipo"))
            cargarPokemonesBuscados(btipo, ttitulo, tcontainer, btnTipoContainer, "TIPO")
            detallesBuscados("btnTIPO", "bTipo", tBody)
        }
    btnLimpiar.classList.remove("hidden")
    } else {
        swal("No hay historial", "Realice una búsqueda antes, por favor", "./Imagenes/noStorage.gif", {buttons: false, timer: 2500})
    }
}
btnBuscados.addEventListener("click", mostrarBuscados)

mostrarDetalles = () => {

}

detallesBuscados = (id, filtroAplicado, tabla) => {
    let btnDetalle = document.getElementById(`${id}`)
    btnDetalle.addEventListener("click", () => {
        let contenido = ""
        let array = buscados.filter(x => x.filtro == `${filtroAplicado}`)
        contenido =     `<tr>
                            <th>Búsqueda realizada</th>
                            <th>Resultado arrojado</th>
                        </tr>`
        array.forEach(y => {
            contenido +=    `<tr>
                                <td>"${y.valor}"</td>
                                <td>${y.resultado}</td>
                            </tr>`
        })
        tabla.innerHTML = contenido
    })
}

let limpiarStorage = () => {
    sessionStorage.clear("Buscados-Nombre")
    sessionStorage.clear("Buscados-Tipo")
    limpiarBuscados()
    buscadosNombre = []
    buscadosTipo = []
    buscados = []
    btnStorage.classList.add("hidden")
}

let mostrarBtnLimpiarStorage = () => {
    if ((sessionStorage.getItem("Buscados-Nombre")) || (sessionStorage.getItem("Buscados-Tipo")) !== null) {
        btnStorage.classList.remove("hidden")
        btnStorage.addEventListener("click", limpiarStorage)
    }
}
mostrarBtnLimpiarStorage()

let alertaMolestado = (x) => {
    swal("Acabás de molestar a " + capitalize(x.nombre), "", "./Imagenes/Pokemones/" + capitalize(x.nombre) + ".png", {
        buttons: {
          cancel: "¡Escapar!",
          catch: {text: "¡Arrojar Pokebola!", value: "catch"},
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
            if (equipo.length < 6) {
                let match = equipo.find(matcheado => matcheado.nombre === x.nombre)
                if (!match) {
                equipo.push(x)
                swal("¡¡Atrapado!!","¡" + capitalize(x.nombre) + " fue agregado a tu equipo exitosamente!", "./Imagenes/PokemonAtrapado.gif")
                cargarEquipoPokemon(equipo)
                } else {
                    swal("Este pokemon ya se encuentra en su equipo, elija otro", "", "./Imagenes/pokemonDuplicado.gif")
                }
            } else {
                swal("¡Ups! Su equipo está completo", "Libere un pokemon del equipo para poder agregar otro", "./Imagenes/equipoLleno.gif")
            }
            break;
          default:
            swal("¡Zafaste!", "", "./Imagenes/PokemonEscape.gif");}
    });
}

swal(
    "INSTRUCCIONES",
    "En esta página podrá armar el equipo que más le guste interaccionando con los pokemones que sean de su interés.\n" + "Arrastrándose sobre las tarjetas podrá ver características de cada Pokemon, mientras que haciendo 'click' sobre la pokebola interaccionará con ellos.\n" + "Podrá ver el registro de sus búsquedas al final del sitio.\n" + "Disfrute y ¡atrápelos ya!",
    "info",
    {className: "swal-instrucciones"}
)