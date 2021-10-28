import { useRouter } from 'next/router'
import { getTrackAnalysis } from '../../lib/spotify'

const Track = ({ trackData }) => {
  

  return (
    <>
      {JSON.stringify(trackData)}
    </>
  )
}

export default Track

export async function getServerSideProps(context) {
  const id = context.query.id

  const resTrackData = await getTrackAnalysis(id)
  // console.log(await resTrackData)
  const trackData = await resTrackData.json()
  // console.log("trackData", trackData)

  if (!trackData) return { notFound: true }

  return {
    props: {
      trackData: trackData
    }
  }
}