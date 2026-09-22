import { Link } from 'react-router-dom'
import { useSelection } from '../SelectionContext'

export default function Selection() {
  const { selection, retirerSelection } = useSelection()

  if (selection.length === 0) {
    return (
      <div>
        <h1>Ma sélection</h1>
        <p>Aucune recette sélectionnée pour l'instant</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Ma sélection</h1>
      <ul>
        {selection.map((meal) => (
          <li key={meal.idMeal}>
            <Link to={`/recette/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
              <p>{meal.strMeal}</p>
            </Link>
            <button onClick={() => retirerSelection(meal.idMeal)}>
              Retirer
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}