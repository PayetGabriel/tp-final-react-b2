import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Meal } from '../types'

const lettres = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [letter, setLetter] = useState('')

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

  const filteredMeals = meals.filter((meal) => {
    const nomEnMinuscule = meal.strMeal.toLowerCase()
    const rechercheEnMinuscule = search.toLowerCase()

    const correspondALaRecherche = nomEnMinuscule.includes(rechercheEnMinuscule)
    const correspondALaLettre = letter === '' || meal.strMeal.startsWith(letter)

    return correspondALaRecherche && correspondALaLettre
  })

  return (
    <div>
      <h1>Accueil</h1>

      <input
        type="text"
        placeholder="Rechercher une recette"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select value={letter} onChange={(event) => setLetter(event.target.value)}>
        <option value="">Toutes les lettres</option>
        {lettres.map((lettre) => (
          <option key={lettre} value={lettre}>
            {lettre}
          </option>
        ))}
      </select>

      {filteredMeals.length === 0 && (
        <p>Aucune recette ne correspond à ta recherche</p>
      )}

      <ul>
        {filteredMeals.map((meal) => (
          <li key={meal.idMeal}>
            <Link to={`/recette/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
              <p>{meal.strMeal}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}