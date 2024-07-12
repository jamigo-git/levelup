import { Button, Flex, Typography } from 'antd'

import { setIsEnding, setIsRunning } from '@/slices/game/gameSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getGameStatistic } from '@/slices/game/gameSelector'

import { useTranslation } from 'react-i18next'
import style from './end.module.scss'

export const EndScreen = () => {
  const { Title, Text } = Typography
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const gameStatistic = useAppSelector(getGameStatistic)
  return (
    <Flex vertical className={style.end}>
      <Flex vertical align='center' justify='space-between' className={style.background} gap={20}>
        <Title>{t('EndScreen.title')}</Title>
        <Flex vertical gap={20} align='flex-start' className={style.wrapper}>
          <Text>
            {t('EndScreen.maxWaves')}: {gameStatistic.bestWavesCount}
          </Text>
          <Text>
            {t('EndScreen.maxEnemiesKilled')}: {gameStatistic.bestKillCount}
          </Text>
        </Flex>
        <Flex vertical gap={20} align='space-between' className={style.wrapper}>
          <Text>
            {t('EndScreen.waves')}: {gameStatistic.currentWaves}
          </Text>
          <Text>
            {t('EndScreen.enemiesKilled')}: {gameStatistic.currenKillCount}
          </Text>
        </Flex>

        <Flex align='center' justify='center' className={style.bottom}>
          <Button
            onClick={() => {
              dispatch(setIsRunning(true))
              dispatch(setIsEnding(false))
            }}>
            {t('EndScreen.repeatButtonText')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
