import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { MealDetail } from '../types'
import { getIngredients } from '../utils'
import { useSelection } from '../SelectionContext'

function getTexteBouton(dansSelection: boolean) {
  if (dansSelection) {
    return 'Retirer de ma sélection'
  } else {
    return 'Ajouter à ma sélection'
  }
}

export default function Recette() {
  const { id } = useParams()
  const [meal, setMeal] = useState<MealDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { ajouterSelection, retirerSelection, estDansSelection } = useSelection()

  useEffect(() => {
    setLoading(true)
    setError('')
    setMeal(null)

    fetch(`${import.meta.env.VITE_API_URL}/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals === null) {
          setError("Cette recette n'existe pas")
        } else {
          setMeal(data.meals[0])
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Impossible de charger la recette')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Chargement...</p>
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    )
  }

  if (meal === null) {
    return null
  }

  const ingredients = getIngredients(meal)
  const dansSelection = estDansSelection(meal.idMeal)

  function toggleSelection() {
    if (meal === null) {
      return
    }

    if (dansSelection) {
      retirerSelection(meal.idMeal)
    } else {
      ajouterSelection(meal)
    }
  }

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
      <p>{meal.strCategory} - {meal.strArea}</p>

      <button onClick={toggleSelection}>{getTexteBouton(dansSelection)}</button>

      <h2>Ingrédients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{meal.strInstructions}</p>
    </div>
  )
}