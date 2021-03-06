import querystring from 'querystring'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  })

  return response.json()
}

// get top tracks and artists

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()
  
  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken()

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

// get track analysis & audio features

const TRACK_ANALYSIS_ENDPOINT = `https://api.spotify.com/v1/audio-analysis/`
const TRACK_AUDIO_FEATURES =  `https://api.spotify.com/v1/audio-features/`

export const getTrackAnalysis = async (id) => {
  const { access_token } = await getAccessToken()
  
  return fetch(`${TRACK_ANALYSIS_ENDPOINT}${id}`, {
    headers: { 
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getTrackAudioFeatures = async (id) => {
  const { access_token } = await getAccessToken()

  return fetch(`${TRACK_AUDIO_FEATURES}${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

// get player information

const PLAYBACK_STATE_ENDPOINT = `https://api.spotify.com/v1/me/player`
const AVAILABLE_DEVICES_ENDPOINT = `https://api.spotify.com/v1/me/player/devices`

export const getPlaybackState = async () => {
  const { access_token } = await getAccessToken()

  return fetch(PLAYBACK_STATE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getAvailableDevices = async () => {
  const { access_token } = await getAccessToken()

  return fetch(AVAILABLE_DEVICES_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}