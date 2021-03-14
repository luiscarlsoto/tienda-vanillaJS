const express = require('express')
const mysql = require('mysql2');
const url = require('url');


//Configuracion de nuesta base de datos
const db = require('./config');
//Creamos la conexión a la base de datos.
const connection = mysql.createConnection(db);
connection.connect();
// Asignamos las rutas

// valor del puerto
const port = process.env.PORT;
// asignmaos express a nuestro
const app = express()
//CORS
var cors = require('cors')
app.use(cors())
app.use(express.json());


app.post('/product', (req, res) =>{
    let data = req.body;
    console.log(data)
    let query = data.category === "" ? `SELECT * FROM product WHERE name LIKE '%${data.search}%'` :
    `SELECT * FROM product WHERE name like '%${data.search}%' AND category = '${data.category}'`
    try {
        connection.query(query, '%' + req.body.search + '%', (err, results, field) => {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}
            ));
    });
    } catch (error) {
        res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
    }
})

app.get('/category', (req, res) =>{
        try {
            connection.query('SELECT * FROM category', (err, results, field) => {
                res.send(JSON.stringify({"status": 200, "error": null, "response": results
            }));
        });
        } catch (error) {
                res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
        }    
    });

app.listen(port, () => {
    console.log(`Ejecutando servidor en el puerto ${port}...`);
});