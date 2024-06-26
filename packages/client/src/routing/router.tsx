import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '@/pages/ErrorPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { GamePage } from '@/pages/GamePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegistrationPage } from '@/pages/RegistrationPage'
import { routes } from './routes'
import { PrivatePageHOC } from './PrivatePageHOC'

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
        path: routes.login.path,
        element: <LoginPage />,
      },
      {
        path: routes.profile.path,
        element: (
          <PrivatePageHOC>
            <ProfilePage />
          </PrivatePageHOC>
        ),
      },
      {
        path: routes.game.path,
        element: <GamePage />,
      },
      {
        path: routes.registration.path,
        element: <RegistrationPage />,
      },
    ],
  },
])
