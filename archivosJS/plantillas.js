function mostrarPokemon(existir) {
    return `<div>
                <p>Las características de ${existir.nombre} son:</p>
                    <li>Tipo: ${existir.tipo}</li>
                    <li>Ataque favorito: ${existir.ataqueFavorito}</li>
                    <li>Evolución/es: ${existir.evolucion}</li>
                    <p>A continuación puede apreciar una imagen de ${existir.nombre}</p>
            </div>`
}

