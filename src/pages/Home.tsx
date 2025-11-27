import React, { useRef, useEffect, useState } from 'react'
import { MOVIES } from '../data/movies'
import { Link } from 'react-router-dom'
import { fetchMovieByTitle } from '../services/tmdb'
import { IMAGE_BASE_URL } from '../services/tmdb'

export default function Home(){
  const [apiMovies, setApiMovies] = useState([])
  const savedCustom = JSON.parse(localStorage.getItem('custom_movies')||'[]')
  const removed = JSON.parse(localStorage.getItem('removed_movies')||'[]')

  const localMovies = [...savedCustom, ...MOVIES].filter(
    m => !removed.includes(m.id)
  )

  useEffect(() => {
    async function loadAPI(){
      const list = [
        "Batman O Cavaleiro das Trevas",
        "Avatar",
        "O Senhor dos Anéis",
        "Vingadores",
        "Interestelar",
        "Transformers",
      ]
      const results = []
      for (const name of list){
        try{
          const m = await fetchMovieByTitle(name)
          if (m) results.push(m)
        }catch(e){ console.error("TMDB fetch error:", e) }
      }
      setApiMovies(results)
    }
    loadAPI()
  }, [])

  const merged = [...apiMovies, ...localMovies]

  const destaque1 = merged.slice(0, 12)
  const destaque2 = [...merged].sort(() => Math.random() - 0.5)

  const ref1 = useRef(null)
  const ref2 = useRef(null)

  const scroll = (ref, dir) => {
    if (ref && ref.current){
      ref.current.scrollBy({ left: dir * 350, behavior:"smooth" })
    }
  }

  const renderCarousel = (title, items, ref) => (
    <div className="carousel-block">
      <h2 className="section-title" style={{ marginBottom:"1rem", marginTop:"2.5rem" }}>{title}</h2>
      <div style={{ position:"relative" }}>
        <button onClick={()=>scroll(ref,-1)} className="carousel-arrow left">‹</button>
        <div ref={ref} className="carousel-container">
          {items.map(movie => (
            <Link key={movie.id} to={`/movies/${movie.id}`} className="card-hover" style={{
              minWidth:"180px", width:"180px", background:"#11121f", padding:"0.6rem", borderRadius:"14px", textDecoration:"none"
            }}>
              <img src={movie.posterUrl} style={{width:"100%", height:"270px", objectFit:"cover", borderRadius:"10px"}}/>
              <p style={{ marginTop:"0.6rem", fontSize:"0.9rem", color:"white" }}>{movie.title}</p>
            </Link>
          ))}
        </div>
        <button onClick={()=>scroll(ref,1)} className="carousel-arrow right">›</button>
      </div>
    </div>
  )

  return (
    <main>
      {renderCarousel("Destaques", destaque1, ref1)}
      {renderCarousel("Filmes aleatórios", destaque2, ref2)}
    </main>
  )
}
