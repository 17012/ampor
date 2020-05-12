import { useState, useEffect } from 'react'

import { getOAuthToken as getAuth } from './Authentication'

const usePlayer = () => {
  let player
  useEffect(() => {
    console.log('wait')
    window.onSpotifyWebPlaybackSDKReady = () => {
      player = new window.Spotify.Player({
        name: 'Ampor',
        getOAuthToken: cb => {
          cb(getAuth())
        },
      })

      console.log('hey')
      player.addListener('initialization_error', ({ message }) => {
        console.error('1', message)
      })
      player.addListener('authentication_error', ({ message }) => {
        console.error('2', message)
      })
      player.addListener('account_error', ({ message }) => {
        console.error('3', message)
      })
      player.addListener('playback_error', ({ message }) => {
        console.error('4', message)
      })
      player.addListener('player_state_changed', state => {
        console.log(state)
      })
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })
      player.connect()
    }
  })

  return player
}

export default usePlayer
