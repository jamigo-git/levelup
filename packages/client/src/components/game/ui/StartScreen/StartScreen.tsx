import { setIsEnding, setIsRunning } from '@/slices/game/gameSlice'
import { Button, Flex, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getGameStatistic } from '@/slices/game/gameSelector'
import { useTranslation } from 'react-i18next'
import style from './start.module.scss'

export const StartScreen = () => {
  const gameStatistic = useAppSelector(getGameStatistic)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { Text, Title } = Typography
  return (
    <Flex vertical className={style.start}>
      <Flex vertical align='center' justify='space-between' className={style.background} gap={20}>
        <Title>{t('StartScreen.title')}</Title>
        <Flex vertical gap={20} align='space-between'>
          <Text>
            {t('StartScreen.maxWaves')}: {gameStatistic.bestWavesCount}
          </Text>
          <Text>
            {t('StartScreen.maxEnemiesKilled')}: {gameStatistic.bestKillCount}
          </Text>
        </Flex>

        <Flex align='center' justify='center' className={style.bottom}>
          <Button
            onClick={() => {
              dispatch(setIsRunning(true))
              dispatch(setIsEnding(false))
            }}>
            {t('StartScreen.startGameButtonText')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
