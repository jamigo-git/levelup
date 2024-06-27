import { RootState } from '../..'

export const getIsAuth = (store: RootState) => store.auth.isAuth
export const getIsAuthenticating = (store: RootState) =>
  store.auth.isAuthenticating
export const getUser = (store: RootState) => store.auth.user
