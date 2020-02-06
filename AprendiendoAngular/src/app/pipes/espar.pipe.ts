import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'espar'
})

export class EsParPipe implements PipeTransform{

	transform(value: any){
		var espar = "no es un numero par";
		if(value % 2 == 0){
			espar = "es un numero par";
		}
		
		return "El año es: " + value + " y " + espar;
	}

}