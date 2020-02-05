'use strct'

//cargar modulos de node para crear servisor
var express = require('express');
var bodyParser = require('body-parser');

//ejecutar express
var app = express();


//cargar ficheros rutas
var article_routes = require('./routes/article');

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS (se ejecuta antes de cada ruta para permitir que cualquier cliente pueda ahcer peticiones)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijos rutas / cargar rutas
app.use('/api', article_routes);


//exportar modulo (fichero actual)
module.exports = app;