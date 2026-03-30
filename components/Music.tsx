"use client"

// @ts-expect-error Types for howler are missing
import { Howl } from "howler"
import { useRef, useCallback } from "react"

const VOLUME_FULL = 0.35
const VOLUME_DUCKED = 0.10

export default function useMusic() {
  const soundRef = useRef<Howl | null>(null)
  const isDuckedRef = useRef(false)

  const getSound = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ["/music.mp3"],
        volume: VOLUME_DUCKED,
      })
    }
    return soundRef.current
  }, [])

  /** Start music at ducked volume (voiceover will be playing) */
  const play = useCallback((ducked = false) => {
    const s = getSound()
    if (!s.playing()) {
      isDuckedRef.current = ducked
      s.volume(ducked ? VOLUME_DUCKED : 0)
      s.play()
      if (!ducked) {
        s.fade(0, VOLUME_FULL, 3000)
      }
    }
  }, [getSound])

  /** Lower music volume so voiceover can be heard clearly */
  const duck = useCallback(() => {
    const s = soundRef.current
    if (s && s.playing() && !isDuckedRef.current) {
      isDuckedRef.current = true
      s.fade(s.volume(), VOLUME_DUCKED, 600)
    }
  }, [])

  /** Restore music volume when voiceover ends */
  const unduck = useCallback(() => {
    const s = soundRef.current
    if (s && s.playing() && isDuckedRef.current) {
      isDuckedRef.current = false
      s.fade(s.volume(), VOLUME_FULL, 1200)
    }
  }, [])

  const fadeOut = useCallback(() => {
    const s = soundRef.current
    if (s) s.fade(s.volume(), 0, 3000)
  }, [])

  return { play, fadeOut, duck, unduck }
}
