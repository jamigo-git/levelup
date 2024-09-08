import { FC, LegacyRef, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Flex, Typography } from 'antd'

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getGameStatistic } from '@/slices/game/gameSelector'
import { setIsEnding, setIsRunning, setStatistic } from '@/slices/game/gameSlice'
import { useFullscreen } from '@/hooks/useFullScreen'

import { useTranslation } from 'react-i18next'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import sendStatistic from '@/utils/sendStatistic'
import { getUser } from '@/store/slices/auth/authSelector'
import { CURSOR, LIMIT, RANG_KILLS_MAP, RANG_REMAINING_MAP, RATING_FIELD_NAME } from '@/constants/leaderboard'
import { getLeaderboardData } from '@/slices/leaderboard/leaderboardSelector'
import { leaderboardTeamReq } from '@/slices/leaderboard/leaderboardSlice'
import castleImage from '../assets/castle.png'
import { GameConfig } from '../model/Game'
import { StartScreen } from './StartScreen/StartScreen'
import { EndScreen } from './EndScreen/EndScreen'
import { Building } from '../model/Building'
import { MapConfig } from '../commonTypes'
import { maps } from '../maps'
import { Overlay } from './Overlay/Overlay'
import { StatisticData } from '@/types/leaderboard'

import style from './game.module.scss'

export const Game: FC = () => {
  const { Text } = Typography
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const gameStatistic = useAppSelector(getGameStatistic)
  const user = useAppSelector(getUser)
  const leaderboardRows = useAppSelector(state => getLeaderboardData(state))
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
    dispatch(leaderboardTeamReq({ ratingFieldName: RATING_FIELD_NAME, cursor: CURSOR, limit: LIMIT }))
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

  useEffect(() => {
    if (!user) return
    if (gameStatistic.isEnding) {
      const statistic: StatisticData = {
        bestWavesCount: gameStatistic.bestWavesCount,
        bestKillCount: gameStatistic.bestKillCount,
        currentCoins: gameStatistic.currentCoins,
      }
      sendStatistic.send(user, statistic)
    }
  }, [gameStatistic, user])

  useEffect(() => {
    const handleStatistic = async () => {
      const tasks = Array.from(RANG_KILLS_MAP.entries())
        .filter(([key]) => gameStatistic.currenKillCount === key && gameStatistic.isRunning)
        .map(async ([, value]) => {
          // Получаем информацию о позиции пользователя в лидерборде
          const stat = leaderboardRows?.find(row => row.name === user?.login)
          const target = RANG_REMAINING_MAP[value]
            ? `${t('Game.notificationTwo')} ${RANG_REMAINING_MAP[value].remainingCount} ${t(
                'Game.notificationThree'
              )} "${RANG_REMAINING_MAP[value].rang}"`
            : ''
          const rate = stat?.position
            ? `${t('Game.notificationFour')} - ${stat.position}`
            : `${t('Game.notificationFive')}`

          // eslint-disable-next-line no-new
          new Notification(`${t('Game.notification')}`, {
            body: `${t('Game.notificationOne')} "${value}"! ${target}. ${rate}`,
          })
        })

      await Promise.all(tasks)
    }

    handleStatistic().catch(error => {
      console.error('Ошибка при обработке статистики:', error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatistic, user])

  if (!mapConfig) return <>ERROR</>
  return (
    <Flex
      style={{ width: `${mapConfig.mapPixelWidth}px` }}
      className={style.wrapper}
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
          className={style.canvas}
          ref={canvasRef as LegacyRef<HTMLCanvasElement>}
        />
        <div className={style.castle}>
          <img src={castleImage} alt='castle' className={style.castle__image} />
        </div>
      </Overlay>
      <div style={{ width: `${mapConfig.mapPixelWidth}px` }} className={style.controls}>
        <div className={style.statistic}>
          {gameStatistic.isRunning && (
            <>
              <Text className={`${style.text} ${style.coins}`}>
                {t('Game.coinsCount')}: {gameStatistic.currentCoins}
              </Text>
              <Text className={`${style.text} ${style.coins}`}>
                {t('Game.killsCount')}: {gameStatistic.currenKillCount}
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
