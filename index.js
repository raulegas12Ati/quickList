const linkAPI = "http://localhost:3333"
let modoEscolhidoPeloUsuario = 0
let isOnline = false

document.addEventListener("DOMContentLoaded", () => {
    const buttonBuscar = document.querySelector(".buscar")
    const buttonCriar = document.querySelector(".criar")
    const buttonOnline = document.querySelector("#online")

    buttonBuscar.onclick = () => {
        filterSearch()
    }
    buttonCriar.onclick = () => {
        createFilter()
    }
    buttonOnline.onclick = () => {
        changeSiteMode()
    }
})

async function createFilter() {
    if (!isOnline) {
        window.location.href = "./listaCompras.html"
    }
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
    if (!isOnline) {
        window.location.href = "./listaCompras.html"
    }
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
    window.location.href = "./listaCompras.html"
}

function changeSiteMode() {
    modoEscolhidoPeloUsuario = modoEscolhidoPeloUsuario + 1

    if (modoEscolhidoPeloUsuario > 1) {
        modoEscolhidoPeloUsuario = 0
        console.log("Chegou aqui 1")
    }

    if (modoEscolhidoPeloUsuario === 1) {
        isOnline = true
        console.log("Chegou aqui 2")
    }

    if (modoEscolhidoPeloUsuario === 0) {
        isOnline = false
        console.log("Chegou aqui 3")
    }
    
    localStorage.setItem("isOnline", JSON.stringify(isOnline))

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
console.log(isOnline)