import { Button, Flex, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Game } from '@/components/game'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getGameStatistic } from '@/slices/game/gameSelector'
import { setIsEnding, setIsRunning } from '@/slices/game/gameSlice'

export const GamePage = () => {
  const { Text } = Typography
  const dispatch = useAppDispatch()
  const gameStatistic = useAppSelector(getGameStatistic)
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.game.title}</title>
      </Helmet>

      <Flex vertical justify='center' align='center'>
        <Game />
        {gameStatistic.isRunning && (
          <Flex gap={10} align='center'>
            <Text>Количество монет: {gameStatistic.currentCoins}</Text>
            <Button
              onClick={() => {
                dispatch(setIsRunning(false))
                dispatch(setIsEnding(true))
              }}>
              Остановить игру
            </Button>
            <Text>Башня стоит 50 монет!</Text>
          </Flex>
        )}
      </Flex>
    </>
  )
}
