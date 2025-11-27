import React from 'react'
import { useFavorites } from '../context/FavoritesContext'

type Props = {
  movieId: number
}

export default function FavoriteButton({ movieId }: Props) {
  const { favorites, toggle } = useFavorites()
  const isFav = favorites.includes(movieId)

  return (
    <button
      type="button"
      className="favorite"
      aria-pressed={isFav}
      aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      onClick={() => toggle(movieId)}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  )
}
