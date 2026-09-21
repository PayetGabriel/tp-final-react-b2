import { useEffect, useState } from 'react'
import type { Meal } from '../types'

function Home() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/filter.php?c=Seafood`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals)
        setLoading(false)
      })
      .catch(() => {
        setError('Impossible de charger les recettes')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Chargement...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Accueil</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
            <p>{meal.strMeal}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home