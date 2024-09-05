import dotenv from 'dotenv'
import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import express, { Request as ExpressRequest } from 'express'
import path from 'path'
import serialize from 'serialize-javascript'
import { HelmetServerState } from 'react-helmet-async'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const clientPath = path.join(__dirname, '..')

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const port = process.env.CLIENT_PORT || 3000
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }))
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      // Получаем файл client/index.html который мы правили ранее
      // Создаём переменные
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; helmetContext: { helmet: HelmetServerState }; initialState: unknown }>
      let template: string

      if (vite) {
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8')

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template)

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render
      } else {
        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8')

        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(clientPath, 'dist/server/entry-server.js')

        // Импортируем этот модуль и вызываем с инишл стейтом
        render = (await import(pathToServer)).render
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, helmetContext, initialState } = await render(req)
      const { helmet } = helmetContext

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template
        .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    const lightBlueUnderline = '\x1b[36;4m'
    const reset = '\x1b[0m'

    console.log(`  ➜ 🚀 Client is listening on port: ${port}`)
    console.log(
      `  ➜ 🚀 Click on the following link to open the app: ${lightBlueUnderline}http://localhost:${port}${reset}`
    )
  })
}

createServer()
