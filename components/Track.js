import styled from 'styled-components'

const Card = styled.li`
  width: 90%;
  box-shadow: 3px 3px 10px 5px #1f2733;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: #334155;

  @media (min-width: 1600px) {
    width: 45%;
  }
`

const LeftColumn = styled.div`
  width: 45%;
  margin: 0 auto;
  color: #fca59d;
`

const RightColumn = styled.div`
  width: 45%;
  align-self: center;
  margin: 0 auto;
`

const Heading = styled.h1`
  font-size: calc(5px + 2vmin);
  color: #a5b4e1;
`

const Track = ({ track }) => {
console.log("trackID", track.id)
  return (
    <Card>
      <LeftColumn>
        <Heading><a href={track.songUrl}>{track.title} - {track.artist}</a></Heading>
        <p>Album: <a href={track.album.href}>{track.album.name}</a></p>
        <p>Popularity: <span style={{color: "#fbbf24"}}>{track.popularityRating}</span></p>
        <p>Length:&nbsp;
          {Math.floor(parseInt(track.length)/1000/60)}:
          {(Math.ceil(parseInt(track.length)/1000 % 60)).toString().padStart(2, "0")}</p>
        {track.explicit ? <p style={{color: "red"}}>Explicit</p> : ''}
      </LeftColumn>
      <RightColumn>
        {/* <img src={track.album.images[0].url}
             alt={`${track.album.name} Album Photo`}
             style={{maxWidth: "100%", height: "auto"}}
        /> */}
        <iframe src={`https://open.spotify.com/embed/track/${track.id}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </RightColumn>
      
    </Card>
  )
}

export default Track