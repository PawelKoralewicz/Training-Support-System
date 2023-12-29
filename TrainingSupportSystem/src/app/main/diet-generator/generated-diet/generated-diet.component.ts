import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generated-diet',
  templateUrl: './generated-diet.component.html',
  styleUrls: ['./generated-diet.component.scss']
})
export class GeneratedDietComponent implements OnInit {

  meals: any[] = [];
  userPreferences: any;
  
  constructor() {
    this.initialize();
    console.log(this.meals);
    console.log(this.userPreferences);
  }

  ngOnInit(): void {
  }

  initialize() {
    if(history.state.meals) {
      this.meals = history.state.meals;
      console.log(history.state);
      this.userPreferences = history.state.userSelection;
    }
  }

  generateDiet() {
    
  }

}
