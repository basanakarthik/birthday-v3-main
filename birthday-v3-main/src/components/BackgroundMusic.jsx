"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio("/audio/music.mp3")
    audio.loop = true
    audio.volume = 0.45
    audioRef.current = audio

    const tryPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch (e) {
        // Autoplay might be blocked — user can toggle play.
      }
    }

    tryPlay()

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch (e) {
        // play blocked
      }
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        aria-label={playing ? "Pause background music" : "Play background music"}
        onClick={toggle}
        className="flex items-center gap-2 bg-white/6 backdrop-blur-sm text-rose-50 px-3 py-2 rounded-full border border-white/8 hover:opacity-90"
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="text-sm">{playing ? "Music On" : "Music Off"}</span>
      </button>
    </div>
  )
}
