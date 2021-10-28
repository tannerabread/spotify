import { getTrackAnalysis } from '../../lib/spotify'
import { getTrackAudioFeatures } from '../../lib/spotify'

const Track = ({ trackAudioAnalysis, trackAudioFeatures }) => {
  

  return (
    <>
      {JSON.stringify(trackAudioFeatures)}
    </>
  )
}

export default Track

export async function getServerSideProps(context) {
  const id = context.query.id

  const resAudioAnalysis = await getTrackAnalysis(id)
  const trackAudioAnalysis = await resAudioAnalysis.json()

  const resAudioFeatures = await getTrackAudioFeatures(id)
  const trackAudioFeatures = await resAudioFeatures.json()

  if (!trackAudioAnalysis && !trackAudioFeatures) return { notFound: true }

  return {
    props: {
      trackAudioAnalysis: trackAudioAnalysis,
      trackAudioFeatures: trackAudioFeatures
    }
  }
}