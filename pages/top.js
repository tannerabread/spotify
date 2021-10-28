import Layout from '../components/Layout'


const Top = ({ tracks, artists }) => {
  
  if (!tracks || !artists) return <div>loading...</div>

  // add grid to display better
  return (
    <>
      <Layout>
        <ul>
          {tracks.map((song, i) => (
            <li key={i}>
              {/* <Song song={song} /> */}
              <a href={song.songUrl}>{song.title} - {song.artist}</a>
            </li>
          ))}
        </ul>
        <ul>
          {artists.map((artist, j) => (
            <li key={j}>
              <a href={artist.artistUrl}>{artist.name}</a>
              <ul>
                {artist.genres.map((genre, k) => (
                  <li key={k}>
                    {genre}
                  </li>
                ))}
              </ul>
            </li>
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