'use strict'

var validator = require('validator');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');

var controller = {

	datosCurso: (req, res)=>{
		var hola = req.body.hola;

		return res.status(200).send({
			curso: "curso de js",
			autor: "Jose antonio servin",
			url: "ant.mx",
			hola: hola
		});
	},


	test: (req, res) => {
		return res.status(200).send({
			mensaje: "soy el accion test de mi controlador de articulos"
		});
	},

	save: (req, res) =>{
		//recojer parametros por post
		var params = req.body;

		//validar datos (validator libreria)
		try{
			var validate_title = !validator.isEmpty(params.title);
			var validate_content = !validator.isEmpty(params.content);
		}catch(err){
			return res.status(200).send({
				status: 'error',
				messaje: "Faltan datos por enviar"
			});
		}

		if(validate_title && validate_content){
			//crear el objeto a guardar
			var article = new Article();

			//asignar valores a guardar
			article.title = params.title;
			article.content = params.content;
			article.image = null;

			//guardar articulo
			article.save( (err, articleStored) => {
				if(err || !articleStored){
					return res.status(404).send({
						status: 'seccess',
						mensaje: "El articulo no se ha guardado"
					});
				}

				//devolver una respuesta
				return res.status(200).send({
					status: 'seccess',
					article: articleStored
				});
			});
			
		}else{
			return res.status(200).send({
				status: 'error',
				mensaje: "Los datos no son validos"
			});

		}


	},

	getArticles: (req, res) => {
		//find 
		var query = Article.find({});

		var last = req.params.last;
		if(last || last != undefined){
			query.limit(5);
		}

		query.sort('-_id').exec((err, articles) => {
			if(err){
				return res.status(500).send({
					status: 'error',
					mensaje: "Error al devolver los articulos"
				});
			}

			if(!articles){
				return res.status(404).send({
					status: 'error',
					mensaje: "No hay articulos para mostrar"
				});
			}

			return res.status(200).send({
				status: 'success',
				articles
			});
		});

	},

	getArticle: (req, res) => {
		// recoger id de url
		var articleId = req.params.id;

		//comprobar si existe
		if(!articleId || articleId == null){
			return res.status(404).send({
				status: 'error',
				mensaje: "No existe el articulo"
			});
		}


		//buscar articulo
		Article.findById(articleId, (err, article) => {
			if(err ||!article){
				return res.status(404).send({
					status: 'success',
					mensaje: "No existe el articulo."
				});		
			}

			//devolver en json 
			return res.status(200).send({
				status: 'success',
				article
			});

		});
	},

	update: (req, res) => {
		//recoger el id del articulo por la url
		var articleId = req.params.id;

		//recoger los datos que llegan por put
		var params = req.body;

		//validar los datos 
		try{
			var validate_title = !validator.isEmpty(params.title);
			var validate_content = !validator.isEmpty(params.content);
		}catch(err){
			return res.status(200).send({
				status: 'error',
				mensaje: "Falta datos por enviar."
			});
		}

		if(validate_title && validate_content){
			//find and update
			Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
				if(err){
					return res.status(500).send({
						status: 'error',
						mensaje: "Error al actualizar."
					});
				}

				if(!articleUpdated){
					return res.status(500).send({
						status: 'error',
						mensaje: "No existe el articulo."
					});
				}

				//devolver una respuesta
				return res.status(200).send({
					status: 'success',
					articleUpdated
				});
			});
		}else{
			//devolver rspuesta
			return res.status(200).send({
				status: 'error',
				mensaje: "la validacion no es correcta."
			});
		}
	},

	delete: (req, res) => {
		//devolver id de url
		var articleId = req.params.id;

		//find and delete
		Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
			if(err){
				return res.status(500).send({
					status: 'error',
					mensaje: "error al borrar."
				});
			}

			if(!articleRemoved){
				return res.status(404).send({
					status: 'error',
					mensaje: "no se ha borrado el articulo, posiblemente no exista."
				});
			}

			//devolver rspuesta
			return res.status(200).send({
				status: 'success',
				article: articleRemoved
			});
		});
	},

	upload:(req, res) => {
		//configurar el modulo del conect multiparty router/article.js(hecho)

		//recoger el fichero de la peticion
		var fileName = 'imagen no subida.';
		if(!req.files){
			return res.status(404).send({
				status: 'error',
				mensaje: file_name 
			});
		}

		//conseguir nimbre y extencion del archivo
		var file_path = req.files.file0.path;
		var file_split = file_path.split('/');

		//nombre del archivo
		var file_name = file_split[2];

		//extencion del fichero
		var extencion_split = file_name.split('.');
		var file_ext = extencion_split[1];

		//comprobar la extencion, solo imagenes, si no es validad borrar ficehro
		if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){

			fs.unlink(file_path, () => {
				return res.status(200).send({
					status: 'error',
					mensaje: "La extencion de la imagen no es valida"
				});
			});

		}else{
			//si todo el valido sacando id de url
			var articleId = req.params.id;

			//buscar articulo, asignar nombre de imagen y actualizar
			Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, articleUpdated) => {
				if(err || !articleUpdated){
					return res.status(200).send({
						status: 'error',
						article: 'Error al guardar la imagen'
					});
				}
				return res.status(200).send({
					status: 'success',
					article: articleUpdated
				});
			})
		}

	},

	getImage: (req, res) =>{
		var file = req.params.image;
		var path_file = './uploads/articles/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(404).send({
					status: 'error',
					mensaje: 'La imagen no existe.'
				});
			}
		});
	},

	search: (req, res) => {
		//sacar string
		var searchString = req.params.search;

		//find or
		Article.find({ "$or": [
			{"title": {"$regex" : searchString, "$options": "i"}},
			{"content": {"$regex" : searchString, "$options": "i"}}
		]})
		.sort([['date', 'descending']])
		.exec((err, articles) => {
			if(err){
				return res.status(500).send({
					status: 'error',
					mensaje: "Error en la peticion."
				});
			}

			if(!articles || articles.length <= 0){
				return res.status(404).send({
					status: 'error',
					mensaje: "No hay articulos que coincidan con tu busqueda."
				});
			}

			return res.status(200).send({
				status: 'success',
				articles
			});
		})
	}

};// en controller

module.exports = controller;




















