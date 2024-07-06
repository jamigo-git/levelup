import { useCallback, useEffect, useState } from 'react'

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [element, setElement] = useState<HTMLElement | null>(null)

  const requestFullscreen = useCallback((el: HTMLElement) => {
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (
      'mozRequestFullScreen' in el &&
      typeof el.mozRequestFullScreen === 'function' &&
      el.mozRequestFullScreen
    ) {
      el.mozRequestFullScreen()
    } else if (
      'webkitRequestFullscreen' in el &&
      typeof el.webkitRequestFullscreen === 'function' &&
      el.webkitRequestFullscreen
    ) {
      el.webkitRequestFullscreen()
    } else if ('msRequestFullscreen' in el && typeof el.msRequestFullscreen === 'function' && el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
    setElement(el)
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (
      'mozCancelFullScreen' in document &&
      typeof document.mozCancelFullScreen === 'function' &&
      document.mozCancelFullScreen
    ) {
      // Firefox
      document.mozCancelFullScreen()
    } else if (
      'webkitExitFullscreen' in document &&
      typeof document.webkitExitFullscreen === 'function' &&
      document.webkitExitFullscreen
    ) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen()
    } else if (
      'msExitFullscreen' in document &&
      typeof document.msExitFullscreen === 'function' &&
      document.msExitFullscreen
    ) {
      // IE/Edge
      document.msExitFullscreen()
    }
    setElement(null)
  }, [])

  const toggleFullscreen = useCallback(
    (el: HTMLElement) => {
      if (isFullscreen) {
        exitFullscreen()
      } else {
        requestFullscreen(el)
      }
    },
    [isFullscreen, requestFullscreen, exitFullscreen]
  )

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  return { isFullscreen, requestFullscreen, exitFullscreen, toggleFullscreen, element }
}
