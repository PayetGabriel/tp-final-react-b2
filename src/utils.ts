import type { MealDetail } from './types'

export function getIngredients(meal: MealDetail) {
  const ingredients: string[] = []

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof MealDetail
    const measureKey = `strMeasure${i}` as keyof MealDetail

    const ingredient = meal[ingredientKey]
    const measure = meal[measureKey]

    if (ingredient !== '') {
      ingredients.push(`${measure} ${ingredient}`)
    }
  }

  return ingredients
}