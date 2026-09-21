import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Recette from './pages/Recette'
import Selection from './pages/Selection'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/selection">Ma sélection</Link>
        <Link to="/contact">Contact</Link>
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