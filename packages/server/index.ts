import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'

import { dbConnect } from './src/config/db'
import { errorLogger, requestLogger } from './src/middlewares/logger'
import { handleError } from './src/middlewares/handleError'
import router from './src/routes'

dotenv.config()

const port = Number(process.env.SERVER_PORT) || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())

app.use(requestLogger)
app.use('/api', router)
app.use(errorLogger)
app.use(handleError)
;(async function () {
  await dbConnect()
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
})()
