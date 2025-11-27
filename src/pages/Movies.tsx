import React, { useMemo, useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import MovieList from '../components/MovieList'
import SearchBar from '../components/SearchBar'

export default function Movies(){
  const [query,setQuery] = useState('')
  const [genre,setGenre] = useState<string|null>(null)
  const [sortBy,setSortBy] = useState<string|null>(null)
  const {movies,loading} = useMovies(query, genre, sortBy)

  const genres = useMemo(()=> {
    const set = new Set<string>()
    movies.forEach(m => m.genre.forEach(g=>set.add(g)))
    return Array.from(set)
  },[movies])

  return (
    <div>
      <h2>Catálogo</h2>
      <SearchBar query={query} setQuery={setQuery} />
      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
        <select value={genre ?? ''} onChange={e=>setGenre(e.target.value || null)}>
          <option value="">Todos gêneros</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={sortBy ?? ''} onChange={e=>setSortBy(e.target.value || null)}>
          <option value="">Ordenar</option>
          <option value="rating">Mais bem avaliados</option>
          <option value="year">Por ano</option>
        </select>
      </div>
      {loading ? <div>Carregando...</div> : <MovieList movies={movies} />}
    </div>
  )
}
