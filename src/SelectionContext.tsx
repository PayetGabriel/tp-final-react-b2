import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Meal } from './types'

type SelectionContextType = {
  selection: Meal[]
  ajouterSelection: (meal: Meal) => void
  retirerSelection: (idMeal: string) => void
  estDansSelection: (idMeal: string) => boolean
}

const SelectionContext = createContext<SelectionContextType | null>(null)

type SelectionProviderProps = {
  children: ReactNode
}

export function SelectionProvider({ children }: SelectionProviderProps) {
  const [selection, setSelection] = useState<Meal[]>([])

  function ajouterSelection(meal: Meal) {
    setSelection([...selection, meal])
  }

  function retirerSelection(idMeal: string) {
    const nouvelleSelection = selection.filter((meal) => meal.idMeal !== idMeal)
    setSelection(nouvelleSelection)
  }

  function estDansSelection(idMeal: string) {
    return selection.some((meal) => meal.idMeal === idMeal)
  }

  const value = {
    selection: selection,
    ajouterSelection: ajouterSelection,
    retirerSelection: retirerSelection,
    estDansSelection: estDansSelection,
  }

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const context = useContext(SelectionContext)

  if (context === null) {
    throw new Error('useSelection doit être utilisé dans SelectionProvider')
  }

  return context
}