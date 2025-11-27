import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header(){
  const location = useLocation()
  const current = location.pathname
  return (
    <header>
      <div className="header-inner">
        <div className="header-title">
          <div className="logo-pill">🎬</div>
          <div>
            <span>Catálogo de Filmes</span>
            <div className="header-badge">Front-end Frameworks • AV2</div>
          </div>
        </div>
        <nav className="nav">
          <Link to="/" className={current === '/' ? 'active' : ''}>Home</Link>
          <Link to="/movies" className={current.startsWith('/movies') ? 'active' : ''}>Filmes</Link>
          <Link to="/favorites" className={current === '/favorites' ? 'active' : ''}>Favoritos</Link>
          <Link to="/about" className={current === '/about' ? 'active' : ''}>Sobre</Link>
          <Link to="/add">Adicionar Filme</Link>
      </nav>
      </div>
    </header>
  )
}
