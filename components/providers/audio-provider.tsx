'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CONTENT, type Track } from '@/lib/content'

type AudioState = {
  tracks: Track[]
  index: number
  track: Track
  playing: boolean
  loading: boolean
  error: string | null
  progress: number
  duration: number
  toggle: () => void
  play: (i?: number) => void
  next: () => void
  prev: () => void
  seek: (ratio: number) => void
}

const AudioCtx = createContext<AudioState | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const tracks = CONTENT.lagu
  const audioRef = useRef<HTMLAudioElement>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const start = useCallback((audio: HTMLAudioElement) => {
    setError(null)
    setLoading(true)
    audio.play().catch((e: DOMException) => {
      setLoading(false)
      setError(e?.name === 'NotAllowedError' ? 'Ketuk tombol putar sekali lagi ya.' : 'Lagu belum bisa diputar.')
    })
  }, [])

  const play = useCallback(
    (i?: number) => {
      const audio = audioRef.current
      if (!audio) return
      if (typeof i === 'number' && i !== index) {
        setIndex(i)
        setProgress(0)
        audio.src = tracks[i].file
        audio.load()
      } else if (!audio.src) {
        audio.src = tracks[index].file
      }
      start(audio)
    },
    [index, start, tracks],
  )

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) play()
    else audio.pause()
  }, [play])

  const next = useCallback(() => play((index + 1) % tracks.length), [index, play, tracks.length])
  const prev = useCallback(() => play((index - 1 + tracks.length) % tracks.length), [index, play, tracks.length])

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = Math.min(Math.max(ratio, 0), 1) * audio.duration
  }, [])

  const nextRef = useRef(next)
  nextRef.current = next

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlaying = () => {
      setPlaying(true)
      setLoading(false)
    }
    const onPause = () => setPlaying(false)
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnded = () => nextRef.current()
    const onError = () => {
      if (!audio.getAttribute('src')) return
      setLoading(false)
      setPlaying(false)
      setError('Lagu gagal dimuat.')
    }
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const value = useMemo<AudioState>(
    () => ({ tracks, index, track: tracks[index], playing, loading, error, progress, duration, toggle, play, next, prev, seek }),
    [tracks, index, playing, loading, error, progress, duration, toggle, play, next, prev, seek],
  )

  return (
    <AudioCtx.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="none" />
    </AudioCtx.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio harus dipakai di dalam <AudioProvider>')
  return ctx
}
