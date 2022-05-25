import { Component, OnInit } from '@angular/core';

class Beispiel {
  constructor() {
    this.counter = 0;
    this.beispielText = 'Hello'
  }

  counter: number;
  beispielText: string;
} 

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor() { }

  listCars: string[] = []; 
  user: any;
  beispiel: Beispiel = new Beispiel();

  ngOnInit()
  {
    console.log("Main");

    this.listCars = ['Car1', 'Car2'];
    this.user = JSON.parse(localStorage.getItem('AccessToken') || "{}");
  }

  meinButton() {
    this.beispiel.counter = this.beispiel.counter + 1;
    alert(this.beispiel.beispielText + '. Du hast ' + this.beispiel.counter + ' mal geklickt');
  }
}
