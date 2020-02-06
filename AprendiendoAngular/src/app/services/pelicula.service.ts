import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService{

	public peliculas: Pelicula[];

	constructor(){
		this.peliculas = [
			new Pelicula("spiderman", 2019, "https://img-cdn.hipertextual.com/files/2019/08/hipertextual-marvel-estaria-planeando-pelicula-avengers-vs-x-men-2019602039.jpg?strip=all&lossy=1&quality=57&resize=740%2C490&ssl=1"),
			new Pelicula("vengadores", 2018, "https://home.ripley.cl/store/Attachment/WOP/D172/2000371435454/2000371435454-1.jpg"),
			new Pelicula("vengadore 2", 2017, "https://img-cdn.hipertextual.com/files/2019/08/hipertextual-marvel-estaria-planeando-pelicula-avengers-vs-x-men-2019602039.jpg?strip=all&lossy=1&quality=57&resize=740%2C490&ssl=1"),
			new Pelicula("superman", 2016, "https://img-cdn.hipertextual.com/files/2019/08/hipertextual-marvel-estaria-planeando-pelicula-avengers-vs-x-men-2019602039.jpg?strip=all&lossy=1&quality=57&resize=740%2C490&ssl=1")
		];
	}

	holaMundo(){
		return "Hola mundo desde el servicio de angular";
	}

	getPeliculas(){
		return this.peliculas;
	}
}
