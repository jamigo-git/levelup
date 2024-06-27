import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '@/pages/ErrorPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { GamePage } from '@/pages/GamePage'
import { LoginPage } from '@/pages/LoginPage'
import { ForumPage } from '@/pages/ForumPage'
import { ForumTopicPage } from '@/pages/ForumTopicPage'
import { RegistrationPage } from '@/pages/RegistrationPage'
import { routes } from './routes'
import { PrivatePageHOC } from './PrivatePageHOC'
import { PublicPageHOC } from './PublicPageHOC'

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
        element: (
          <PublicPageHOC>
            <LoginPage />
          </PublicPageHOC>
        ),
      },
      {
        path: routes.registration.path,
        element: (
          <PublicPageHOC>
            <RegistrationPage />
          </PublicPageHOC>
        ),
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
        element: (
          <PrivatePageHOC>
            <GamePage />
          </PrivatePageHOC>
        ),
      },
      {
        path: routes.forum.path,
        element: <ForumPage />,
      },
      {
        path: 'forum/topic/:id',
        element: <ForumTopicPage />,
      },
    ],
  },
])
