import { Component } from '@angular/core';

@Component({
	selector: 'mi-componente',
	templateUrl: './mi-componente.component.html'
})

export class MiComponente{
	public titulo: string;
	public comentario: string;
	public year: number;
	public mostrarPeliculas: boolean;

	constructor(){
		this.titulo = "Hola mundo, soy Mi componente";
		this.comentario = "Este es mi primer compoinente";
		this.year = 2020;
		this.mostrarPeliculas = true;
	}

	ocultarPeliculas(){
		this.mostrarPeliculas = false;
	}
}