import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Samduba", "bom agora", "https://assets.b9.com.br/wp-content/uploads/2021/07/subwayb9-1280x677.jpg"),
    new Recipe("Samduba 2", "faltoo", "https://segredosdomundo.r7.com/wp-content/uploads/2015/04/destaque33.jpg")
  ];

  getRecipes(){
    return this.recipes.slice();
  }
}
