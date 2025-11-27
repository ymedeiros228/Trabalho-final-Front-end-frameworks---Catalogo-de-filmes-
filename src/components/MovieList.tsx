import React from 'react'
import type { Movie } from '../types/Movie'
import MovieCard from './MovieCard'

export default function MovieList({movies}:{movies:Movie[]}) {
  if (!movies.length) return <div>Nenhum filme encontrado.</div>
  return (
    <div className="container-grid">
      {movies.map(m=> <MovieCard key={m.id} movie={m} />)}
    </div>
  )
}
