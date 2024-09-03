export const EXTERNAL_API_URL = 'https://ya-praktikum.tech/api/v2'

const clientPort = Number(process.env.CLIENT_PORT) || 3000
export const CORS_ORIGINS = [`http://levelup-towerdefense-39.ya-praktikum.tech:${clientPort}`]
