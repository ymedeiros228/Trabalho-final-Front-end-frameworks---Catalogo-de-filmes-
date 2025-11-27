import React from 'react'
import { MOVIES } from '../data/movies'
import MovieList from '../components/MovieList'
import { useFavorites } from '../context/FavoritesContext'

export default function Favorites(){
  const {favorites} = useFavorites()
  const savedCustom = JSON.parse(localStorage.getItem("custom_movies") || "[]")
  const allMovies = [...MOVIES, ...savedCustom]
  const favMovies = allMovies.filter(m=>favorites.includes(m.id))

  return (
    <div>
      <h2>Favoritos</h2>
      <MovieList movies={favMovies} />
    </div>
  )
}
