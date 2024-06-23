import { useEffect, useRef } from 'react'

export const useCanvas = (callback: ([canvas, ctx]: [HTMLCanvasElement, CanvasRenderingContext2D]) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    callback([canvas, ctx])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return canvasRef
}
