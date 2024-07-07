import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Game } from '@/components/game'

export const GamePage = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.game.title}</title>
      </Helmet>

      <Game />
    </>
  )
}
