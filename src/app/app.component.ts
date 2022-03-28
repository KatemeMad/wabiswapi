import { Component, OnInit} from '@angular/core';
import { SwapiService } from './services/swapi.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  peopleList: any = []


  constructor(private swapiService: SwapiService) {

  }

  ngOnInit() {
    this.swapiService.getPeople().subscribe((response: any) =>{
      this.peopleList = response.results;
    })
  }
}
