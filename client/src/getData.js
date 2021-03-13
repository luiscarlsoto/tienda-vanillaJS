const SERVER_URL = 'http://localhost:5000/'
var search = ""
fetch(SERVER_URL+'category')
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        let category = data.response;
        for (let cat in category) {
            fetch(SERVER_URL+'product',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({category: category[cat].id, search: search})
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                let item = data.response;
                console.log(item)
                for(let element in item) {
                    let itemHTML = `
                    <div class="card"> 
                        <div class="card-header">
                            <img class="card-img" src="${item[element].url_image}"/>
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
    })
