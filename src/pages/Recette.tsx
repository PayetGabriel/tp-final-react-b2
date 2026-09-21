import { useParams } from 'react-router-dom'

export default function Recette() {
  const { id } = useParams()

  return (
    <div>
      <h1>Recette {id}</h1>
    </div>
  )
}