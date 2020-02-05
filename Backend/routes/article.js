'use strict'

var express = require('express');
var ArticleContoller = require('../controllers/article');

var router = express.Router();

var multipatar = require('connect-multiparty');
var md_upload = multipatar({uploadDir: './uploads/articles'});


//rutas de prueba
router.post('/datos-curso', ArticleContoller.datosCurso);
router.get('/test-controlador', ArticleContoller.test);


// Rutas utlies
router.post('/save', ArticleContoller.save); 
router.get('/articles/:last?', ArticleContoller.getArticles); 
router.get('/article/:id', ArticleContoller.getArticle); 
router.put('/article/:id', ArticleContoller.update); 
router.delete('/article/:id', ArticleContoller.delete); 

router.post('/upload-imagen/:id', md_upload, ArticleContoller.upload); 
router.get('/get-imagen/:image', ArticleContoller.getImage); 

router.get('/search/:search', ArticleContoller.search);

module.exports = router;