import { getTopArtists } from '../../lib/spotify'

export default async (_, res) => {
  const response = await getTopArtists()
  const { items } = await response.json()

  const artists = items.map((artist) => ({
    name: artist.name,
    genres: artist.genres,
    artistUrl: artist.external_urls.spotify,
    images: artist.images,
    popularityRating: artist.popularity,
    followers: artist.followers.total
  }))

  return res.status(200).json({ artists })
}