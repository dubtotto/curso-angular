import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Global } from './global';

@Injectable()
export class ArticleService {

	public url: string;
	constructor(
		private _Http: HttpClient
	){

		this.url = Global.url;
	}

	pruebas(){
		return 'servicio de articulos';
	}

	getArticles():Observable<any>{
		return this._Http.get(this.url+'articles')
	}
}
