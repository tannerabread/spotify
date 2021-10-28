import { getTopArtists } from '../../lib/spotify'

export default async (_, res) => {
  const response = await getTopArtists()
  const { items } = await response.json()

  console.log("artists", items)
  const artists = items.map((artist) => ({
    name: artist.name,
    genres: artist.genres,
    artistUrl: artist.external_urls.spotify
  }))

  return res.status(200).json({ artists })
}