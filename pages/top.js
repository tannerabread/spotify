import Layout from '../components/Layout'
import Artist from '../components/Artist'
import styled from 'styled-components'
import { getTopArtists } from '../lib/spotify'
import { getTopTracks } from '../lib/spotify'

const Heading = styled.h1`
  font-family: 'Rock Salt', cursive;
  font-size: calc(5px + 8vmin);
`

const Top = ({ tracks, artists }) => {
  
  if (!tracks || !artists) return <div>loading...</div>

  // add grid to display better
  return (
    <>
      <Layout>
        <Heading>Top Tracks</Heading>
          <ul>
            {tracks.map((song, i) => (
              <li key={i}>
                {/* <Song song={song} /> */}
                <a href={song.songUrl}>{song.title} - {song.artist}</a>
              </li>
            ))}
          </ul>
        <Heading>Top Artists</Heading>
          <ul>
            {artists.map((artist, j) => (
              <Artist key={j} artist={artist} />
            ))}
          </ul>
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
    title: track.name
  }))

  const resArtists = await getTopArtists()
  const artistsItems = await resArtists.json()
  const artists = artistsItems.items.map((artist) => ({
    name: artist.name,
    genres: artist.genres,
    artistUrl: artist.external_urls.spotify,
    images: artist.images,
    popularityRating: artist.popularity,
    followers: artist.followers.total
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