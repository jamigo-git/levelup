import { RootState } from '../..'

export const getLeaderboardData = (store: RootState) => store.leaderboard.leaderboard
export const getIsLoading = (store: RootState) => store.leaderboard.isLoading
