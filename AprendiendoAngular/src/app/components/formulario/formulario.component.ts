import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
	public user: any;
	public campo: string;
	constructor() { 
		this.user = {
			nombre: '',
			apellidos: '',
			bio: '',
			genero: ''
		}
	}

	ngOnInit() {
	}

	onSubmit(){
		console.log(this.user);
	}

	hasdadoclick(){
		alert("has dado click");
	}

	hasSalido(){
		alert("has salido");
	}

	hasdadoEnter(){
		alert("has dadon enter");
	}

	hasdado(){
		alert("has dadon");
	}

}
