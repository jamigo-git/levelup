export const EXTERNAL_API_URL = 'https://ya-praktikum.tech/api/v2'

const clientPort = Number(process.env.CLIENT_PORT) || 3000
export const CORS_ORIGINS = [`http://localhost:${clientPort}`]
