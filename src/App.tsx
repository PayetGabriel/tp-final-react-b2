import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Recette from './pages/Recette'
import Selection from './pages/Selection'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function getLienClassName(estActif: boolean) {
  if (estActif) {
    return 'lien-actif'
  } else {
    return ''
  }
}

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => getLienClassName(isActive)}>
          Accueil
        </NavLink>
        <NavLink to="/selection" className={({ isActive }) => getLienClassName(isActive)}>
          Ma sélection
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => getLienClassName(isActive)}>
          Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recette/:id" element={<Recette />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App 