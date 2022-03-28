import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PersonDetailComponent } from 'src/app/components/person-detail/person-detail.component';
import { Person } from 'src/app/model/person';
import { SwapiService } from 'src/app/services/swapi.service';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  
  planet: string;
  species: Array<string>;
  movis: Array<string>;

  @Input() person: Person;

  constructor(private swapiService: SwapiService,public dialog: MatDialog) { 
    this.person = {
      id: NaN,
      name: '',
      homeworld: '',
      gender: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      birth_year: '',
      species: [],      
      films: []
    };
    this.planet = ''
    this.species = [];
    this.movis = [];
  }

  ngOnInit(): void {
    
    // what is the homeworld?
    let idPlanet = parseInt(this.person.homeworld.slice(30, -1));
    this.swapiService.getPlanets(idPlanet).subscribe((response: any) =>{
      let planetName = response.name;
      this.planet = planetName;
    })

    // wich are person species?
    if (this.person.species.length > 0) {
      this.person.species.forEach(specie =>{
        let idSpecie = parseInt(specie.slice(-2, -1));
        this.swapiService.getSpecies(idSpecie).subscribe((response: any) =>{
          let specieName = response.name;
          this.species.push(specieName);
        })
      });
    } else {
      this.species.push('Unknow specie');
    }

    // wich are person movies?
    this.person.films.forEach(movie =>{
      let idMovi = parseInt(movie.slice(-2, -1));
      this.swapiService.getFilms(idMovi).subscribe((response: any) =>{
        let moviTitle = response;
        this.movis.push(moviTitle);
      })
    });
  }

  showFilms(): void {
    // Open dialog details
    const dialogPerson = this.dialog.open(PersonDetailComponent, {
      data: {
        namePerson: this.person.name, 
        movis: this.movis
      },
      width: '30vw',
      panelClass: 'detail-modal'
    });
  }

}
