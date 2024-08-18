import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/test', async (req, res) => {
  console.log(req)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
