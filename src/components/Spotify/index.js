import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSpotifyPlayer } from './playerContext'
import PlayPauseButton from '../AudioPlayer/PlayPauseButton'

import { errorHandler } from './errorHandler'

const Spotify = ({ getToken, spotifyURI }) => {
  const { spotifyPlayer, state, isLoading, spotifyAPICall } = useSpotifyPlayer()
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState()
  const { paused } = state ? state : {}

  const handlePlayTrack = async () => {
    try {
      const token = await getToken()

      const option = {
        uris: [spotifyURI],
      }
      const res = await axios.put(
        `${process.env.SPOTIFY_API_URL}player/play`,
        option,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log(res.data)
    } catch (e) {
      console.error(e)
      setError(errorHandler(e.response?.data?.error))
    }
  }

  if (isLoading) {
    return <div>Loading Device</div>
  }
  if (!state) {
    return <div>Please Select `Ampor` Device.</div>
  }

  return (
    <>
      {error}
      <PlayPauseButton playing={paused} handleOnClick={handlePlayTrack} />
    </>
  )
}

export default Spotify
