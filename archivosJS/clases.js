class Busqueda {
    constructor(valor, filtro, largo, resultado) {
        this.valor = valor
        this.filtro = filtro
        this.largo = parseInt(largo)
        this.resultado = resultado
    }

    almacenar = (array) => {
        sessionStorage.setItem(array.valor, JSON.stringify(array))
    }
}
