const linkAPI = "http://localhost:3333"
let modoEscolhidoPeloUsuario = 0
let isOnline = false

const buttonBuscar = document.querySelector(".buscar")
buttonBuscar.onclick = () => {
    filterSearch()
}

const buttonCriar = document.querySelector(".criar")
buttonCriar.onclick = () => {
    createFilter()
}

const buttonOnline = document.querySelector("#online")
buttonOnline.onclick = () => {
    changeSiteMode()
}

async function createFilter() {
    const filtro = document.querySelector("#filtro").value

    if (!filtro) {
        alert("Preencha o campo do banco de dados")
        return
    }

    const response = await fetch(`${linkAPI}/criarFiltro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ filtro })
    }).then(response => response.json())

    const { message, error } = response

    if (error) {
        alert(error)
        return
    }

    localStorage.setItem("filtro", JSON.stringify(filtro))
    const localStorageFiltro = localStorage.getItem("filtro")
    alert(message)
    window.location.href = "./listaCompras.html"
}

async function filterSearch() {
    const filtro = document.querySelector("#filtro").value

    if (!filtro) {
        alert("Preencha o campo do banco de dados!")
        return
    }

    const response = await fetch(`${linkAPI}/pesquisaFiltro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ filtro })
    }).then(response => response.json())

    const { message, error } = response

    if (error) {
        alert(error)
        return
    }

    console.log(message)
    localStorage.setItem("filtro", JSON.stringify(filtro))
    const localStorageFiltro = localStorage.getItem("filtro")
    window.location.href = "./listaCompras.html"
}

function changeSiteMode() {
    modoEscolhidoPeloUsuario = modoEscolhidoPeloUsuario + 1

    if (modoEscolhidoPeloUsuario > 1) {
        modoEscolhidoPeloUsuario = 0
    }

    if (modoEscolhidoPeloUsuario === 1) {
        isOnline = true
    }

    if (modoEscolhidoPeloUsuario === 0) {
        isOnline = false
    }

    changeButton(isOnline)
}

function changeButton(isOnline) {
    const button = document.querySelector("#online")

    if (isOnline) {
        button.textContent = "Modo online"
    } else {
        button.textContent = "Modo offline"
    }
}

export const online = isOnline