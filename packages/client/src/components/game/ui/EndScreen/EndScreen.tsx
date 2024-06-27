import { setIsEnding, setIsRunning } from '@/slices/game/gameSlice'
import { Button, Flex, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getGameStatistic } from '@/slices/game/gameSelector'
import style from './end.module.scss'

export const EndScreen = () => {
  const { Title, Text } = Typography
  const dispatch = useAppDispatch()
  const gameStatistic = useAppSelector(getGameStatistic)
  return (
    <Flex vertical className={style.end}>
      <Flex vertical align='center' justify='space-between' className={style.background} gap={20}>
        <Title>Игра окончена!</Title>
        <Flex vertical gap={20} align='flex-start' className={style.wrapper}>
          <Text>Максимальное количество пройденных волн: {gameStatistic.bestWavesCount}</Text>
          <Text>Максимальное количество убитых противников: {gameStatistic.bestKillCount}</Text>
        </Flex>
        <Flex vertical gap={20} align='space-between' className={style.wrapper}>
          <Text>Количество пройденных волн: {gameStatistic.currentWaves}</Text>
          <Text>Количество убитых противников: {gameStatistic.currenKillCount}</Text>
        </Flex>

        <Flex align='center' justify='center' className={style.bottom}>
          <Button
            onClick={() => {
              dispatch(setIsRunning(true))
              dispatch(setIsEnding(false))
            }}>
            Повторим?
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
