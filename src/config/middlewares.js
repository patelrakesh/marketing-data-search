// All middlewares are used here.
import bodyParser from 'koa-bodyparser'
import routes from '../routes'
import errorHandler from './error-handler'
import logger from 'koa-logger'
import json from 'koa-json'
import cors from 'koa-cors'

export default (app) => {

  // Logs requests and responses
  app.use(logger())

  if (process.env.NODE_ENV !== 'production')
    app.use(cors())

  app.use(json({ pretty: process.env.NODE_ENV !== 'production' }))

  // Catch and format the error in the upstream.
  app.use(async (ctx, next) => {
    try {
      await next()

      // Handle 404 - throw it as an error.
      if (ctx.status === 404) {
        ctx.throw(404)
      }

      // Use this when you want to format the 200 res further.
      // e.g. {"status":200,"data":{"message":"Hello home sample!"}}
      // else, you get, e.g. {"message":"Hello home sample!"}
    } catch (err) {
      ctx.status = err.status || 500

      ctx.type = 'json'
      ctx.body = {
        status: ctx.status,
        message: err.message
      }

      ctx.app.emit('error', err, ctx)
    }
  })


  app.use(bodyParser())

  app.on('error', errorHandler)

  // Add routes by group.
  app.use(routes())
}