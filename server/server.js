const express = require('express')
const mysql = require('mysql2');

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
var cors = require('cors')
app.use(cors())

app.get('/product', (req, res) =>{})

app.get('/category', (req, res) => {});

app.listen(port, () => {
    console.log(`Ejecutando servidor en el puerto ${port}...`);
});