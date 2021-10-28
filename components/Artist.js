import styled from 'styled-components'

const Card = styled.a`
  max-width: 90%;
  box-shadow: 3px 3px 10px 5px #1f2733;
  padding: 0.2rem;
  margin: 1rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: #334155;
`

const LeftColumn = styled.div`
  max-width: 50%;
  margin: 1rem;
  color: #fca59d;
`

const RightColumn = styled.div`
  max-width: 50%;
  align-self: center;
  margin: 1rem;
`

const Heading = styled.h1`
  font-size: calc(5px + 2vmin);
`

const YellowSpan = styled.span`
  color: #fbbf24;
`

const Artist = ({ artist }) => {

  return (
    <Card href={artist.artistUrl}>
      <LeftColumn>
        <Heading style={{color: "#a5b4e1"}}>{artist.name}</Heading>
        <br/>
        <p>Popularity: <YellowSpan>{artist.popularityRating}</YellowSpan></p>
        <p>Followers: <YellowSpan>{artist.followers}</YellowSpan></p>
        <ul style={{alignSelf: "flex-start"}}><span style={{color: "#86e18d", fontWeight: "bold"}}>Genres</span>
          {artist.genres.map((genre, i) => (
            <li key={i}>{genre}</li>
          ))}
        </ul>
      </LeftColumn>
      <RightColumn>
        <img src={artist.images[0].url} 
             alt={`${artist.name} picture`}
             style={{maxWidth: "100%", height: "auto"}}
        />
      </RightColumn>
    </Card>
  )
}

export default Artist