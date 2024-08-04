import { FC, LegacyRef, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Flex, Typography } from 'antd'

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getGameStatistic } from '@/slices/game/gameSelector'
import { setIsEnding, setIsRunning, setStatistic } from '@/slices/game/gameSlice'
import { useFullscreen } from '@/hooks/useFullScreen'

import { useTranslation } from 'react-i18next'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import { GameConfig } from '../model/Game'
import { StartScreen } from './StartScreen/StartScreen'
import { EndScreen } from './EndScreen/EndScreen'
import { Building } from '../model/Building'
import { MapConfig } from '../commonTypes'
import { maps } from '../maps'
import { Overlay } from './Overlay/Overlay'
import style from './game.module.scss'

export const Game: FC = () => {
  const { Text } = Typography
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const gameStatistic = useAppSelector(getGameStatistic)
  const [mapName] = useState('DesertOrks')
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  const mousePosition = useRef({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement | null>()
  const animationRef = useRef<number | null>(null)
  const gameRef = useRef<GameConfig>()
  const fullScreenContent = useRef<HTMLDivElement>()

  const mapConfig = useMemo(() => {
    const index = maps.findIndex((map: MapConfig) => map.name === mapName)
    if (index < 0) return undefined
    return maps[index]
  }, [mapName])

  useEffect(() => {
    if (!canvasRef.current || !mapConfig) return
    const canvas = canvasRef.current
    if (!canvas) return
    const game = new GameConfig({
      map: mapConfig,
      canvas,
      setStatistic: statistic => dispatch(setStatistic(statistic)),
    })
    game.gameSetup()
    const setupGame = () => {
      game.canvas.addEventListener('click', game.buildTower)
      gameRef.current = game

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate)
        game.animate(mousePosition.current)
        game.loseCondition(animationRef.current!, isRunning => {
          dispatch(setIsRunning(isRunning))
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const cleanUpGame = () => {
      if (!canvasRef.current || !gameRef.current) return
      const canvas = canvasRef.current
      const game = gameRef.current
      if (!canvas) return
      canvas.removeEventListener('click', game.buildTower)
      if (animationRef.current) {
        if (typeof animationRef.current === 'number') {
          cancelAnimationFrame(animationRef.current)
        }
        animationRef.current = null
      }
    }

    if (gameStatistic.isRunning) {
      setupGame()
    } else {
      cleanUpGame()
    }

    // eslint-disable-next-line consistent-return
    return () => {
      cleanUpGame()
    }
  }, [gameStatistic.isRunning, mapConfig, dispatch])

  useEffect(() => {
    const canvas = canvasRef.current
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      mousePosition.current = { x, y }
    }
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      dispatch(setIsEnding(false))
      dispatch(setIsRunning(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mapConfig) return <>ERROR</>
  return (
    <Flex
      style={{ width: `${mapConfig.mapPixelWidth}px` }}
      vertical
      justify='center'
      align='center'
      gap={10}
      ref={fullScreenContent as LegacyRef<HTMLElement>}>
      <Overlay>
        {!gameStatistic.isRunning && !gameStatistic.isEnding && <StartScreen />}
        {!gameStatistic.isRunning && gameStatistic.isEnding && <EndScreen />}
        <canvas
          height={mapConfig.mapPixelHeight}
          width={mapConfig.mapPixelWidth}
          style={{ background: 'rgba(0, 0, 0, 0)' }}
          ref={canvasRef as LegacyRef<HTMLCanvasElement>}
        />
      </Overlay>
      <div style={{ width: `${mapConfig.mapPixelWidth}px` }} className={style.controls}>
        <div className={style.statistic}>
          {gameStatistic.isRunning && (
            <>
              <Text className={`${style.text} ${style.coins}`}>
                {t('Game.coinsCount')}: {gameStatistic.currentCoins}
              </Text>
              <Button
                onClick={() => {
                  dispatch(setIsRunning(false))
                  dispatch(setIsEnding(true))
                }}>
                {t('Game.stopButtonText')}
              </Button>
              <Text className={style.text}>
                {t('Game.towerCost')} {Building.cost} {t('Game.currency')}
              </Text>
            </>
          )}
        </div>
        <ErrorBoundary>
          <Button
            style={{ justifySelf: 'flex-end' }}
            onClick={() => {
              if (fullScreenContent.current) {
                toggleFullscreen(fullScreenContent.current)
              }
            }}>
            {isFullscreen ? `${t('Game.collapseButtonText')}` : `${t('Game.expandButtonText')}`}
          </Button>
        </ErrorBoundary>
      </div>
    </Flex>
  )
}
