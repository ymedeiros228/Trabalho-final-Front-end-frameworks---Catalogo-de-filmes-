import { useState } from "react"
import { fetchMovieByTitle } from "../services/tmdb"

export default function AddMovie() {
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState("")
  const [posterUrl, setPosterUrl] = useState("")
  const [overview, setOverview] = useState("")
  const [trailerEmbed, setTrailerEmbed] = useState("")
  const [duration, setDuration] = useState("")
  const [ageRating, setAgeRating] = useState("")
  const [userApproval, setUserApproval] = useState("")

  const [loadingApi, setLoadingApi] = useState(false)
  const [apiError, setApiError] = useState("")
  const [apiSuccess, setApiSuccess] = useState("")

  const handleFetchFromApi = async () => {
    setApiError("")
    setApiSuccess("")
    if (!title.trim()) {
      setApiError("Digite o nome do filme antes de buscar na API.")
      return
    }
    try {
      setLoadingApi(true)
      const data = await fetchMovieByTitle(title.trim())
      if (!data) {
        setApiError("Filme não encontrado na API TMDB.")
        return
      }
      if (data.year) setYear(String(data.year))
      if (data.overview) setOverview(data.overview)
      if (data.posterUrl) setPosterUrl(data.posterUrl)
      if (data.duration) setDuration(data.duration)
      if (data.userApproval !== null) setUserApproval(String(data.userApproval))
      if (data.trailerEmbed) setTrailerEmbed(data.trailerEmbed)
      if (data.ageRating !== null) setAgeRating(String(data.ageRating))
      setApiSuccess("Dados preenchidos automaticamente pela API TMDB. Você pode ajustar antes de salvar.")
    } catch (err) {
      console.error(err)
      setApiError("Erro ao buscar dados na API TMDB.")
    } finally {
      setLoadingApi(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const stored = localStorage.getItem("custom_movies")
      const customMovies = stored ? JSON.parse(stored) : []
      const newMovie = {
        id: Date.now(),
        title: title.trim(),
        year: year ? Number(year) : new Date().getFullYear(),
        genre: genre ? genre.split(",").map(g => g.trim()).filter(Boolean) : [],
        rating: rating ? Number(rating) : 0,
        posterUrl: posterUrl.trim(),
        overview: overview.trim(),
        trailerEmbed: trailerEmbed.trim() || undefined,
        duration: duration.trim() || undefined,
        ageRating: ageRating ? Number(ageRating) : undefined,
        userApproval: userApproval ? Number(userApproval) : undefined,
      }
      customMovies.push(newMovie)
      localStorage.setItem("custom_movies", JSON.stringify(customMovies))
      // limpar
      setTitle(""); setYear(""); setGenre(""); setRating(""); setPosterUrl(""); setOverview(""); setTrailerEmbed(""); setDuration(""); setAgeRating(""); setUserApproval("")
      alert("Filme adicionado com sucesso!")
    } catch (err) {
      console.error(err); alert("Erro ao salvar filme")
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">Adicionar Filme</h1>
      <div style={{ marginBottom: "1.5rem", maxWidth: 700 }}>
        <p><strong>Modo automático (API TMDB):</strong> digite o nome do filme e clique em <em>Buscar na API</em>.</p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
          <input className="form-input" style={{ flex: "1 1 220px" }} placeholder="Nome do filme para buscar na API (ex: Batman)..." value={title} onChange={(e)=>setTitle(e.target.value)} />
          <button type="button" className="form-button" onClick={handleFetchFromApi} disabled={loadingApi}>{loadingApi ? "Buscando..." : "Buscar na API"}</button>
        </div>
        {apiError && <p style={{ marginTop: "0.5rem", color: "#f97373", fontSize: "0.9rem" }}>{apiError}</p>}
        {apiSuccess && <p style={{ marginTop: "0.5rem", color: "#4ade80", fontSize: "0.9rem" }}>{apiSuccess}</p>}
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
        <input className="form-input" placeholder="Título do filme" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <input className="form-input" placeholder="Ano (ex: 2024)" value={year} onChange={(e)=>setYear(e.target.value)} />
        <input className="form-input" placeholder="Gêneros (separados por vírgula)" value={genre} onChange={(e)=>setGenre(e.target.value)} />
        <input className="form-input" placeholder="Nota (0 a 10)" value={rating} onChange={(e)=>setRating(e.target.value)} />
        <input className="form-input" placeholder="URL da imagem do poster" value={posterUrl} onChange={(e)=>setPosterUrl(e.target.value)} />
        <textarea className="form-textarea" placeholder="Sinopse..." value={overview} onChange={(e)=>setOverview(e.target.value)} />
        <textarea className="form-textarea" placeholder="Cole aqui o iframe do trailer (ou deixe em branco para usar o da API)" value={trailerEmbed} onChange={(e)=>setTrailerEmbed(e.target.value)} />
        <input className="form-input" placeholder='Duração (ex: "130 min")' value={duration} onChange={(e)=>setDuration(e.target.value)} />
        <input className="form-input" placeholder="Classificação indicativa (ex: 10, 12, 14, 16, 18)" value={ageRating} onChange={(e)=>setAgeRating(e.target.value)} />
        <input className="form-input" placeholder="Porcentagem de usuários que gostaram (0 a 100)" value={userApproval} onChange={(e)=>setUserApproval(e.target.value)} />
        <button className="form-button" type="submit">Adicionar filme</button>
      </form>
    </div>
  )
}
