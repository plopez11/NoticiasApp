import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines, contriesCode, RespuestaPais } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const apiUrlPais = environment.apiUrlPais;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  private ejecutarQueryPais<T>(query: string) {
    query = apiUrlPais + query;
    return this.http.get<T>(query);
  }


  getTopHeadLines(pais: string) {

    this.headLinesPage++;

    if (!pais) {
      pais = 've';
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?language=es&country=${pais}&page=${ this.headLinesPage }`);
    // return this.http.get<RespuestaTopHeadlines>(`${apiUrl}/top-headlines?country=us&apiKey=4e3ffd6b15674c78b0eed1d55a21c603`);
  }

  getTopHeadLinesCategorias( categoria: string, pais:string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    // console.log(categoria);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?language=es&country=${pais}&category=${categoria}&page=${ this.categoriaPage }`);
    // return this.http.get<RespuestaTopHeadlines>(`/top-headlines?country=us&apiKey=4e3ffd6b15674c78b0eed1d55a21c603`);
  }

  getPaises() {
    return this.ejecutarQueryPais<contriesCode>('/all?fields=name;alpha2Code');
  }
}
