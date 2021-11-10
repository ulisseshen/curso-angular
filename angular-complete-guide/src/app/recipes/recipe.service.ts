import {  Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "Samduba",
      "bom agora",
      "https://assets.b9.com.br/wp-content/uploads/2021/07/subwayb9-1280x677.jpg",
      [
        new Ingredient('Carne',1),
        new Ingredient('Batatas', 5),
      ]),
    new Recipe(
      "Samduba 2",
      "faltoo",
      "https://segredosdomundo.r7.com/wp-content/uploads/2015/04/destaque33.jpg",
      [
        new Ingredient('Carne',1),
        new Ingredient('Batatas', 8),
        new Ingredient('Pão', 2),
      ])
  ];

  constructor(private slService:ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
