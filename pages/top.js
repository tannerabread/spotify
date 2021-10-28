import Layout from '../components/Layout'
import Artist from '../components/Artist'
import Track from '../components/Track'
import styled from 'styled-components'
import { getTopArtists } from '../lib/spotify'
import { getTopTracks } from '../lib/spotify'

const Heading = styled.h1`
  font-family: 'Rock Salt', cursive;
  font-size: calc(5px + 8vmin);
  color: #86e18d;
`

const Grid = styled.ul`
  max-width: 95%;
  display: flex;
  flex-flow: column;

  @media (min-width: 1600px) {
    flex-flow: row wrap;
  }
`

const Top = ({ tracks, artists }) => {
  
  if (!tracks || !artists) return <div>loading...</div>

  // add grid to display better
  return (
    <>
      <Layout>
        <Heading>Top Tracks</Heading>
          <Grid>
            {tracks.map((track, i) => (
              <Track key={i} track={track} />
            ))}
          </Grid>
        <Heading>Top Artists</Heading>
          <Grid>
            {artists.map((artist, j) => (
              <Artist key={j} artist={artist} />
            ))}
          </Grid>
      </Layout>
    </>
  )
}

export default Top

export async function getStaticProps() {
  const resTracks = await getTopTracks()
  const tracksItems = await resTracks.json()
  const tracks = tracksItems.items.map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    popularityRating: track.popularity,
    album: track.album,
    length: track.duration_ms,
    explicit: track.explicit,
    preview: track.preview_url,
    id: track.id
  }))

  const resArtists = await getTopArtists()
  const artistsItems = await resArtists.json()
  const artists = artistsItems.items.map((artist) => ({
    name: artist.name,
    genres: artist.genres,
    artistUrl: artist.external_urls.spotify,
    images: artist.images,
    popularityRating: artist.popularity,
    followers: artist.followers.total,
    id: artist.id
  }))

  if (!tracks && !artists) {
    return {
      notFound: true,
    }
  }

  return {
    props: { 
      tracks: tracks,
      artists: artists
    }
  }
}