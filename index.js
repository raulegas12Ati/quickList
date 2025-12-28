const linkAPI = "http://localhost:3333"

const buttonBuscar = document.querySelector(".buscar")
buttonBuscar.onclick = () => {
    filterSearch()
}

const buttonCriar = document.querySelector(".criar")
buttonCriar.onclick = () => {
    createFilter()
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