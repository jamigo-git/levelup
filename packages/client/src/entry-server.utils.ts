import { Request as ExpressRequest } from 'express'
import 'regenerator-runtime/runtime'

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`

  return new URL(req.originalUrl || req.url, origin)
}

export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  Object.entries(req.headers).forEach(([key, values]) => {
    if (values) {
      if (Array.isArray(values)) {
        values.forEach(value => {
          headers.append(key, value)
        })
      } else {
        headers.set(key, values)
      }
    }
  })

  const init: {
    method: string
    headers: Headers
    signal: AbortSignal
    body?: unknown
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
