const SERVER_URL = 'http://localhost:5000/'

var category;
fetch(SERVER_URL+'category')
.then(res => res.ok ? res.json() : Promise.reject(res))
.then(data => {
    category = data; 
    return fetch(SERVER_URL+'product/'+ category.id)
})
.then(res => res.ok ? res.json() : Promise.reject(res))
.then(item => console.log(category, item))
.catch(err => console.warn(err))
