//Selector
const dropdownSelector = document.querySelector("#categorySelect")
const searchInput = document.querySelector(".searchInput")
const containerStore = document.getElementById('container-store')
const categorySelect = document.getElementById('categorySelect')
const loadingBar = document.getElementById('loadingStore')
//Listener
dropdownSelector.addEventListener("change", getItemCategory);
//Detectamos cada vez que le dan enter en el input
searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) document.getElementById("searchBtn").click()
});
//Obtener primera letra en mayuscula.
Object.defineProperty(String.prototype, 'upperCase', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
});

//Inicializando la pagina
let SERVER_URL = 'https://bsales-test123123.herokuapp.com/'
let defaultImg = 'https://commercial.bunn.com/img/image-not-available.png';
loadPage()
loadCategoryMenu()


//##################    Funciones   ###############################
//Busquedas por nombre
function search() {
    let search = searchInput.value
    loadPage(null, search)
}
// Busqueda por categoria - menú
function getItemCategory(event) {
    //Loadpage(id de la pagina, elemento a buscar). Por si se desea agregar un buscador por categoria.
    loadPage(event.target.value || null, "")

}
// Cargamos el menú
async function loadCategoryMenu() {
    var itemHTML;
    let categoryList = await getCategory();
    for (let index in categoryList) {
        itemHTML = `<option value=${categoryList[index].id}>${categoryList[index].name.upperCase()}</option>`
        categorySelect.innerHTML += itemHTML
    }
}
//Obtenemos la lista de categorias desde el servidor
function getCategory() {
    const categoryList = fetch(SERVER_URL + 'category')
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            return data.response
        })
        .catch(err => console.warn(err))
    return categoryList
}
// Cargamos la pagina con los parametros
async function loadPage(categoryId = null, search = "") {
    loadingBar.style.display = "flex"
    containerStore.innerHTML = ""
    let categoryList = await getCategory()
    //Reinicio de página
    //If !== null Busqueda por categoria, si es null, muestra toda la tienda.
    if (categoryId !== null) {
        let itemHTML = `
            <div class="category">
                <div class="category-title">
                    <h2>${categoryList[categoryId - 1].name.upperCase()}</h2>
                </div>
                <div id="section${categoryId}" class="category-product"></div>
            <div>`
            containerStore.innerHTML += itemHTML
        getProduct(categoryId, search)
    } else {
        for (const index in categoryList) {
            let itemHTML = `
            <div id="category${categoryList[index].id}" class="category">
                <div class="category-title">
                    <h2>${categoryList[index].name.upperCase()}</h2>
                </div>
                <div id="section${categoryList[index].id}" class="category-product"></div>
            <div>`
            containerStore.innerHTML += itemHTML
            getProduct(categoryList[index].id, search)
        }
    }    
}
//Obtención de los productos desde el servidor
function getProduct(categoryId, search) {
    loadingBar.style.display = "flex"
    fetch(SERVER_URL + 'product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: categoryId,
                search: search
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {

            let item = data.response;
            let section = document.getElementById('section' + categoryId)
            let category = document.getElementById('category' + categoryId)            
            for (let element in item) {
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
                section.innerHTML += itemHTML;
            }
            if(item.length < 1){
            loadingBar.style.display = "flex"
                category.parentNode.removeChild(category)
            } 
            if(containerStore.children.length < 1){
                containerStore.innerHTML = 
                "<h1 id='msg-alert' class='alert-msg'>No se encontraron productos con esa descripción.</h1>" 
                loadingBar.style.display = "none"
            } 

        })
        .catch(err => console.warn(err))
        loadingBar.style.display = "none"

}

   