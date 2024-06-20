import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import { ErrorPage } from '@/pages/ErrorPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { GamePage } from '@/pages/GamePage'

export const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.profile.path,
        element: <ProfilePage />,
        handle: {
          title: routes.profile.title,
        },
      },
      {
        path: routes.game.path,
        element: <GamePage />,
        handle: {
          title: routes.profile.title,
        },
      },
    ],
  },
])
