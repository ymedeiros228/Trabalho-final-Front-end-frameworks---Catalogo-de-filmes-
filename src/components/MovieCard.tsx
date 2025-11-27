import React from 'react'
import type { Movie } from '../types/Movie'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

export default function MovieCard({movie}:{movie:Movie}){
  return (
    <div className="card">
      <Link to={`/movies/${movie.id}`}>
        <img className="poster" src={movie.posterUrl} alt={movie.title} />
      </Link>

      <div className="movie-meta-top">
        <span className="movie-year-chip">{movie.year}</span>
        <span className="movie-rating-pill">⭐ {movie.rating.toFixed(1)}</span>
      </div>

      <div className="movie-title">{movie.title}</div>

      <div className="movie-genres">
        {movie.genre.map(g => (
          <span key={g} className="genre-pill">{g}</span>
        ))}
      </div>

      <div style={{marginTop:8, display:'flex', justifyContent:'flex-end', gap:8}}>
        <FavoriteButton movieId={movie.id} />
        
        {movie.id > 1000000000 ? (
          <button
            onClick={() => {
              const saved = JSON.parse(localStorage.getItem('custom_movies')||'[]');
              const updated = saved.filter((m:any) => m.id !== movie.id);
              localStorage.setItem('custom_movies', JSON.stringify(updated));
              window.location.reload();
            }}
            className="delete-btn"
            style={{background:'#d33', color:'#fff', padding:'6px 10px', borderRadius:6, border:'none', cursor:'pointer'}}
          >
            Excluir
          </button>
        ) : (
          <button
            onClick={() => {
              const removed = JSON.parse(localStorage.getItem('removed_movies')||'[]');
              if (!removed.includes(movie.id)) {
                removed.push(movie.id);
                localStorage.setItem('removed_movies', JSON.stringify(removed));
              }
              window.location.reload();
            }}
            className="delete-btn"
            style={{background:'#d33', color:'#fff', padding:'6px 10px', borderRadius:6, border:'none', cursor:'pointer'}}
          >
            Excluir
          </button>
        )}

      </div>
    </div>
  )
}
