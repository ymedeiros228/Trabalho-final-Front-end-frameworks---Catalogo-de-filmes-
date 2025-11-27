export interface Movie {
  id: number
  title: string
  year: number
  genre: string[]
  rating: number
  posterUrl: string
  overview: string
  trailerEmbed?: string
  duration?: string
  ageRating?: number
  userApproval?: number
}
