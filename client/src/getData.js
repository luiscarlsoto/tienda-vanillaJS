//Selector
const dropdownSelector = document.querySelector("#categorySelect")
const searchInput = document.querySelector(".searchInput")

//Listener
dropdownSelector.addEventListener("change", getItemCategory);
    //Detectamos cada vez que le dan enter en el input
searchInput.addEventListener('keyup', (e) => { 
    if(e.keyCode === 13)  document.getElementById("searchBtn").click()
});

//Inicializando la pagina
let SERVER_URL = 'http://localhost:5000/'
let defaultImg = './assets/errorImg.PNG';
let loadingHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
getCategory()
getProduct()

//Funciones
function search() {
    let search = searchInput.value
    searchInput.value = ""
    getProduct("",search)    
}

function getItemCategory (event) {
    getProduct(event.target.value)
}
function getCategory() {
    var itemHTML;
    fetch(SERVER_URL+'category')
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        let category = data.response;
        for (let index in category) {
            itemHTML = `<option value=${category[index].id}>${category[index].name}</option>` 
            document.getElementById('categorySelect').innerHTML += itemHTML
        }
    })    
}

function getProduct(categoryId="",search="") {
    fetch(SERVER_URL+'product',{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: categoryId, search: search})
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        document.getElementById('container').innerHTML = "";
        let item = data.response;
        for(let element in item) {
            let itemHTML = `
            <div class="card"> 
                <div class="card-header">
                    <img class="card-img" src="${item[element].url_image || defaultImg}">
                </div>
                <div class="card-body">
                    <div class="card-title">${item[element].name}</div>
                </div>
                <div class="card-footer">
                    <div class="card-price">$${item[element].price}</div>
                    <div class="card-button"><i class="fas fa-cart-plus"></i></div>
                </div>
            </div>
            `
            document.getElementById('container').innerHTML += itemHTML;
        }        
    })
    .catch(err => console.warn(err))
}

   