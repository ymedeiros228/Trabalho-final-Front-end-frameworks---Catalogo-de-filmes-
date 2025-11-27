import React, { createContext, useContext, useEffect, useState } from 'react'

type FavoritesContextValue = {
  favorites: number[]
  add: (id: number) => void
  remove: (id: number) => void
  toggle: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const raw = window.localStorage.getItem('favorites')
      return raw ? (JSON.parse(raw) as number[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch {
      // ignore
    }
  }, [favorites])

  const add = (id: number) =>
    setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]))

  const remove = (id: number) =>
    setFavorites(prev => prev.filter(x => x !== id))

  const toggle = (id: number) =>
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, toggle }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}
