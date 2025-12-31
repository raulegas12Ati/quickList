
const linkAPI = "http://localhost:3333"
const inputItem = document.querySelector("#item")

//Adiciona o item com o enter
inputItem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        addItem()
    }
})
//array
let items = []


async function addItem() {
    if(!isOnline()){
        alert("Você esta offline")
        return
    }

    const itemName = document.querySelector("#item").value

    if (itemName === "") {
        alert("Digite um item valido")
        return
    }

    //Coleta o filtro do localStorage 
    filtro = getValueLocalStorage()
    //objeto
    const item = {
        name: itemName,
        checked: false,
        filtro: filtro
    }

    //Adiciona o item ao banco de dados
    const response = await fetch(`${linkAPI}/adcionaItemNoBanco`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ item })
    }).then(response => response.json())

    const { error, message } = response

    if (error) {
        alert(error)
        return
    }

    console.log(message)

    document.querySelector("#item").value = ""

    showItemsList()
}

async function showItemsList() {
    //Coleta o filtro do localStorage
    filtro = getValueLocalStorage()
    const sectionList = document.querySelector(".list")

    sectionList.innerHTML = ""

    const response = await fetch(`${linkAPI}/mostrarLista`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ filtro })
    }).then(response => response.json())

    const { error, item } = response
    console.log(item)

    if (error) {
        alert(error)
        return
    }

    items = item

    //Organiza os items de acorco com a coluna checked do banco de dados
    items.sort((itemA, itemB) => Number(itemA.checked - Number(itemB.checked)))

    items.map((item, index) => {
        sectionList.innerHTML += `
        <div class="item">
                <div>
                    <input type="checkbox" name="list" id="item-${index}" ${item.checked === 1 ? "checked" : ""}>
                    <div class="custom-checkbox" onclick="checkItem('${item.nome}')">
                        <img src="./assets/checked.svg" alt="checked">
                    </div>
                    <label for="item-${index}" onclick="checkItem('${item.nome}')"('${item.nome}')>${item.nome}</label>
                </div>
                <button onclick="removeItem('${item.id}')">
                    <img src="./assets/trash-icon.svg" alt="trash icon">
                </button>
            </div>
        `
    })

    localStorage.setItem("items", JSON.stringify(items))
}

async function checkItem(itemName) {
    if(!isOnline()){
        alert("Você esta offline")
        return
    }
    //Coleta o filtro do localStorage
    filtro = getValueLocalStorage()

    try {
        const response = await fetch(`${linkAPI}/mudaChecked_BD`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ filtro, itemName })
        }).then(response => response.json())

        const { error, message } = response

        if (error) {
            alert(error)
            return
        }

        console.log(message)

        showItemsList()
    } catch (error) {
        console.log(error)
    }
}

async function removeItem(idItem) {
    if(!isOnline()){
        alert("Você esta offline")
        return
    }
    //Deleta item no banco de dados
    const response = await fetch(`${linkAPI}/deletarItem`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idItem })
    }).then(response => response.json())

    const { error, message } = response

    if (error) {
        alert(error)
        return
    }

    console.log(message)

    const divWarning = document.querySelector(".warning")
    //Remove a class hide-warning para a mensagem de item removido aparecer
    divWarning.classList.remove("hide-warning")

    //Adiciona a class hide-warning de novo
    setTimeout(() => {
        divWarning.classList.add("hide-warning")
    }, 4000)

    showItemsList()
}

function addHideWarningClass() {
    document.querySelector(".warning").classList.add("hide-warning")
}

function verifyLocalStorageItems() {
    const localStorageItems = localStorage.getItem("items")

    if (localStorageItems) {
        items = JSON.parse(localStorageItems)
        showItemsList()
    }
}

//Cria o header para adicionar qual filtro o usuário esta usando
function CreatedHeader() {
    const localStorageFiltro = JSON.parse(localStorage.getItem("filtro"))
    const header = document.querySelector("header")

    if (localStorageFiltro) {
        header.innerHTML += `
            <img src="./assets/logo.png" alt="logo quickList">

            <div class="menu">
                <button>
                    <a href="./index.html">Voltar</a>
                    <i class="ph ph-arrow-left"></i>
                </button>
                <h2>Banco de dados: <span>${localStorageFiltro}</span></h2>
            </div>
            <h1>Compras da semana</h1>
        `
        return
    }
}

//Coleta o filtro do banco de dados
function getValueLocalStorage() {
    const filtro = JSON.parse(localStorage.getItem("filtro"))
    return filtro
}

function isOnline(){
    return navigator.onLine
}

CreatedHeader()
verifyLocalStorageItems()