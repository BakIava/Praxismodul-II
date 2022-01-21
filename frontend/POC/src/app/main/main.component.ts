import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor() { }

  listCars: string[] = []; 
  
  ngOnInit()
  {
    console.log("Main");

    this.listCars = ['Car1', 'Car2'];
  }
}
