const linkAPI = "http://localhost:3333"
//array
let items = []

async function addItem() {
    const itemName = document.querySelector("#item").value

    if (itemName === "") {
        alert("Digite um item valido")
        return
    }

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

    // items.push(item)
    items = item
    // console.log(items)

    items.sort((itemA, itemB) => Number(itemA.checked - Number(itemB.checked)))

    items.map((item, index) => {
        sectionList.innerHTML += `
        <div class="item">
                <div>
                    <input type="checkbox" name="list" id="item-${index}" ${item.checked === true ? "checked" : ""}>
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

        // const item = items.find((item) => item.name === itemName)
        // item.checked = !item.checked
        showItemsList()
    } catch (error) {
        console.log(error)
    }
}

async function removeItem(idItem) {
    const response = await fetch(`${linkAPI}/deletarItem`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({idItem})
    }).then(response => response.json())

    const {error, message} = response

    if(error){
        alert(error)
        return
    }

    console.log(message)

    const divWarning = document.querySelector(".warning")

    divWarning.classList.remove("hide-warning")

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

function CreateSpan() {
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

function getValueLocalStorage() {
    const filtro = JSON.parse(localStorage.getItem("filtro"))

    return filtro
}

CreateSpan()
verifyLocalStorageItems()