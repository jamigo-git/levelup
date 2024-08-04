import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Game } from '@/components/game'

export const GamePage = () => {
  return (
    <>
      <Helmet>
        <title>{routes.game.title}</title>
        <meta name='description' content={routes.game.description} />
      </Helmet>

      <Game />
    </>
  )
}
