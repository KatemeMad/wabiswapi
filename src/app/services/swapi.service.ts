import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class SwapiService {

  constructor(private http: HttpClient) { }

  getPeople() {
    return this.http.get('https://swapi.dev/api/people/')
  }

  getFilms(id :number) {
    return this.http.get('http://swapi.dev/api/films/' + id)
  }

  getPlanets(id :number) {
    return this.http.get('http://swapi.dev/api/planets/' + id)
  }

  getSpecies(id :number) {
    return this.http.get('http://swapi.dev/api/species/' + id)
  }

}