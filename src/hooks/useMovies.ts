import { useEffect, useMemo, useState } from 'react'
import { MOVIES } from '../data/movies'
import type { Movie } from '../types/Movie'

export function useMovies(
  query = '',
  genreFilter: string | null = null,
  sortBy: string | null = null
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    setLoading(true)
    const t = window.setTimeout(() => {
      try {
        const savedCustom: Movie[] = JSON.parse(
          window.localStorage.getItem('custom_movies') || '[]'
        )
        const removedIds: number[] = JSON.parse(
          window.localStorage.getItem('removed_movies') || '[]'
        )
        const combined = [...MOVIES, ...savedCustom].filter(
          m => !removedIds.includes(m.id)
        )
        setMovies(combined)
        setError(null)
      } catch (e) {
        console.error(e)
        setError('Erro ao carregar filmes.')
        setMovies(MOVIES)
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    let res = movies
    if (query.trim()) {
      const q = query.toLowerCase()
      res = res.filter(
        m =>
          m.title.toLowerCase().includes(q) ||
          m.overview.toLowerCase().includes(q)
      )
    }
    if (genreFilter) {
      res = res.filter(m => m.genre.includes(genreFilter))
    }
    if (sortBy === 'rating') {
      res = [...res].sort((a, b) => b.rating - a.rating)
    }
    if (sortBy === 'year') {
      res = [...res].sort((a, b) => b.year - a.year)
    }
    return res
  }, [movies, query, genreFilter, sortBy])

  return { movies: filtered, loading, error, raw: movies }
}
