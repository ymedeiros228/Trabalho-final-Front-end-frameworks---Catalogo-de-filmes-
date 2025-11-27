import AddMovie from './pages/AddMovie'
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<AddMovie />} />
        </Routes>
        </main>
        <Footer />
      </div>
    
  )
}
