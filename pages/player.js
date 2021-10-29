import { getPlaybackState } from '../lib/spotify'
import { getAvailableDevices } from '../lib/spotify'

const Player = ({ playback, devices }) => {

  console.log("playback", playback)
  console.log("devices", devices)
  return (
    <>
      <div><pre>{JSON.stringify(playback)}</pre></div>
      <div><pre>{JSON.stringify(devices)}</pre></div>
    </>
  )
}

export default Player

export async function getStaticProps() {
  const resPlayback = await getPlaybackState()
  const playbackItem = await resPlayback.json()

  const resDevices = await getAvailableDevices()
  const devicesItem = await resDevices.json()

  if (!playbackItem && !devicesItem) return { notFound: true }

  return {
    props: {
      playback: playbackItem,
      devices: devicesItem
    }
  }
}