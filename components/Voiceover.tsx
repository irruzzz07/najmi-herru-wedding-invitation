"use client"

// @ts-expect-error Types for howler are missing
import { Howl } from "howler"
import { useRef, useCallback, useEffect } from "react"

interface VoiceoverCallbacks {
  onStart?: () => void
  onEnd?: () => void
}

/**
 * Hook to manage multiple voiceovers mapped to slide indices.
 * @param sources - Map of slide index to audio file path
 * @param callbacks - onStart/onEnd callbacks for ducking
 */
export default function useVoiceover(
  sources: Record<number, string>,
  callbacks?: VoiceoverCallbacks
) {
  const howlsRef = useRef<Record<number, Howl>>({})
  const cbRef = useRef(callbacks)
  cbRef.current = callbacks
  const activeRef = useRef<number | null>(null)
  const switchingRef = useRef(false) // flag to suppress onEnd during transitions

  useEffect(() => {
    const howls: Record<number, Howl> = {}

    for (const [key, src] of Object.entries(sources)) {
      const idx = Number(key)
      const howl = new Howl({
        src: [src],
        volume: 1,
      })

      howl.on("play", () => {
        switchingRef.current = false
        cbRef.current?.onStart?.()
      })
      howl.on("end", () => {
        activeRef.current = null
        // Only call onEnd if we're NOT switching to another voiceover
        if (!switchingRef.current) {
          cbRef.current?.onEnd?.()
        }
      })
      howl.on("stop", () => {
        // Only call onEnd if we're NOT switching to another voiceover
        if (!switchingRef.current) {
          activeRef.current = null
          cbRef.current?.onEnd?.()
        }
      })

      howls[idx] = howl
    }

    howlsRef.current = howls

    return () => {
      Object.values(howls).forEach((h) => h.unload())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(sources)])

  /** Play the voiceover for a specific slide index */
  const playForSlide = useCallback((slideIndex: number) => {
    // Stop any currently playing voiceover (set switching flag to suppress onEnd)
    if (activeRef.current !== null && howlsRef.current[activeRef.current]) {
      const prev = howlsRef.current[activeRef.current]
      if (prev.playing()) {
        switchingRef.current = true // suppress onEnd callback
        prev.stop()
      }
    }

    const howl = howlsRef.current[slideIndex]
    if (howl && !howl.playing()) {
      activeRef.current = slideIndex
      howl.play()
    }
  }, [])

  /** Stop any currently playing voiceover */
  const stopAll = useCallback(() => {
    switchingRef.current = false
    if (activeRef.current !== null && howlsRef.current[activeRef.current]) {
      const current = howlsRef.current[activeRef.current]
      if (current.playing()) {
        current.fade(1, 0, 500)
        setTimeout(() => {
          current.stop()
          current.volume(1)
        }, 500)
      }
    }
  }, [])

  return { playForSlide, stopAll }
}
