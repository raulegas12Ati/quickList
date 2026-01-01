console.log("modo offiline mesmo")
createHeader()

//array
let items = []

function addItem() {

    const itemName = document.querySelector("#item").value

    if(itemName===""){
        alert("Digite um item valido")
        return
    }

    //objeto
    const item = {
        name: itemName,
        checked: false
    }

    items.push(item)

    document.querySelector("#item").value = ""

    showItemsList()
}

function showItemsList() {
    const sectionList = document.querySelector(".list")

    sectionList.innerHTML = ""

    items.sort((itemA, itemB) => Number(itemA.checked - Number(itemB.checked)))

    items.map((item, index) => {
        sectionList.innerHTML += `
        <div class="item">
                <div>
                    <input type="checkbox" name="list" id="item-${index}" ${item.checked === true ? "checked" : ""}>
                    <div class="custom-checkbox" onclick="checkItem('${item.name}')">
                        <img src="./assets/checked.svg" alt="checked">
                    </div>
                    <label for="item-${index}" onclick="checkItem('${item.name}')"('${item.name}')>${item.name}</label>
                </div>
                <button onclick="removeItem('${item.name}')">
                    <img src="./assets/trash-icon.svg" alt="trash icon">
                </button>
            </div>
        `
    })

    localStorage.setItem("items", JSON.stringify(items))
}

function checkItem(itemName){
    const item = items.find((item) => item.name === itemName)
    item.checked = !item.checked
    showItemsList()
}

function removeItem(itemName){
    const itemIndex = items.findIndex((item) => item.name === itemName)
    const divWarning = document.querySelector(".warning")

    divWarning.classList.remove("hide-warning")

    setTimeout(() => {
        divWarning.classList.add("hide-warning")
    }, 4000)

    if(itemIndex !== -1){
        items.splice(itemIndex, 1)
    }

    showItemsList()
}

function addHideWarningClass(){
    document.querySelector(".warning").classList.add("hide-warning")
}

function verifyLocalStorageItems(){
    const localStorageItems = localStorage.getItem("items")

    if(localStorageItems){
        items = JSON.parse(localStorageItems)
        showItemsList()
    }
}

function createHeader(){
    const header = document.querySelector("header")

    header.innerHTML = `
         <img src="./assets/logo.png" alt="logo quickList">

        <button>
            <i class="ph ph-arrow-left"></i>
            Voltar
        </button>

        <h1>Compras da semana</h1>
    `
}

verifyLocalStorageItems()