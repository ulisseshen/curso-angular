import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Samduba", "bom agora", "https://assets.b9.com.br/wp-content/uploads/2021/07/subwayb9-1280x677.jpg"),
    new Recipe("Samduba 2", "faltoo", "https://segredosdomundo.r7.com/wp-content/uploads/2015/04/destaque33.jpg")
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
