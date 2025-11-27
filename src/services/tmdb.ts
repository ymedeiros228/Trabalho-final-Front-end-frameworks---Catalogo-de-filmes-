const API_KEY = "43d182f5856277edae281edc4a36d127";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function fetchMovieByTitle(title) {
  if (!title || !title.trim()) return null;
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(title)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.results || !data.results.length) return null;
  const first = data.results[0];
  const det = await fetch(`${BASE_URL}/movie/${first.id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`).then(r => r.json());
  const trailer = det.videos?.results?.find(v => v.site === "YouTube" && v.type === "Trailer");
  return {
    id: `tmdb_${det.id}`,
    title: det.title || first.title,
    year: det.release_date ? Number(det.release_date.slice(0,4)) : null,
    overview: det.overview || first.overview || "",
    posterUrl: det.poster_path ? IMAGE_BASE_URL + det.poster_path : (first.poster_path ? IMAGE_BASE_URL + first.poster_path : ""),
    duration: det.runtime ? `${det.runtime} min` : null,
    userApproval: typeof det.vote_average === "number" ? Math.round(det.vote_average * 10) : null,
    ageRating: 14,
    trailerEmbed: trailer ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : null
  };
}
