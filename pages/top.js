import Layout from '../components/Layout'
import Artist from '../components/Artist'
import styled from 'styled-components'

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
  const resTracks = await fetch('http://localhost:3000/api/topTracks')
  const tracks = await resTracks.json()

  const resArtists = await fetch('http://localhost:3000/api/topArtists')
  const artists = await resArtists.json()

  if (!tracks && !artists) {
    return {
      notFound: true,
    }
  }

  return {
    props: { 
      tracks: tracks.tracks,
      artists: artists.artists
    }
  }
}