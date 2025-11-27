import { useParams, Link } from "react-router-dom"
import { MOVIES } from "../data/movies"
import { useEffect, useState } from "react"
import "./MovieDetails.css"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const stored = JSON.parse(localStorage.getItem("custom_movies") || "[]")
      const allLocal = [...MOVIES, ...stored]
      const localFound = allLocal.find((m) => String(m.id) === String(id))

      if (localFound) {
        setMovie(localFound)
        setLoading(false)
        return
      }

      if (String(id).startsWith("tmdb_")) {
        const numericId = String(id).replace("tmdb_", "")
        const details = await fetch(
          `https://api.themoviedb.org/3/movie/${numericId}?api_key=43d182f5856277edae281edc4a36d127&language=pt-BR&append_to_response=videos`
        ).then((r) => r.json())

        const trailer =
          details.videos?.results?.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          ) || null

        const formatted = {
          id: id,
          title: details.title,
          overview: details.overview,
          year: Number(details.release_date?.slice(0, 4)),
          posterUrl: details.poster_path
            ? "https://image.tmdb.org/t/p/w500" + details.poster_path
            : "",
          duration: details.runtime ? `${details.runtime} min` : "",
          userApproval: Math.round(details.vote_average * 10),
          trailerEmbed: trailer
            ? `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`
            : null,
          ageRating: 14,
        }

        setMovie(formatted)
        setLoading(false)
        return
      }

      setMovie(null)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) return <h2 className="loading">Carregando...</h2>

  if (!movie)
    return (
      <div className="not-found">
        <h1>Filme não encontrado</h1>
        <Link to="/" className="back-btn">Voltar ao catálogo</Link>
      </div>
    )

  return (
    <div className="details-container">
      <div className="poster-area">
        <img className="poster" src={movie.posterUrl} />
        <div className={`classBox age-${movie.ageRating}`}>{movie.ageRating}</div>
      </div>

      <div className="info-area">
        <h1 className="title">{movie.title}</h1>

        
<div className="infoBox">
  <div className="infoRow"><strong>Ano:</strong> <span>{movie.year}</span></div>
  <div className="infoRow"><strong>Duração:</strong> <span>{movie.duration || "?"}</span></div>
  <div className={`infoRow age-${movie.ageRating}`}><strong>Classificação:</strong> <span>{movie.ageRating || "?"}</span></div>
  <div className="infoRow"><strong>Aprovação:</strong> <span>{movie.userApproval}% gostaram</span></div>
</div>


        <h2>Sinopse</h2>
        <p className="overview">{movie.overview}</p>

        {movie.trailerEmbed && (
          <div
            className="trailer-box"
            dangerouslySetInnerHTML={{ __html: movie.trailerEmbed }}
          />
        )}

        <Link to="/" className="back-btn">Voltar ao catálogo</Link>
      </div>
    </div>
  )
}
