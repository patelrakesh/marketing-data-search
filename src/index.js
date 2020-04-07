import dotenv from 'dotenv'
dotenv.config()
import Koa from 'koa'
import http from 'http'
import middlewares from './config/middlewares'
import secureServer from './config/secure-server'
import databases from './config/databases'
import clearbit from './modules/common/utils/clearbit-api'

databases.connectMongo()
clearbit.connectApi()

const app = new Koa()

// Middlewares are imported here. 
middlewares(app)

let server

if (process.env.NODE_ENV === 'production')
  server = secureServer(app.callback())
else
  server = http.Server(app.callback())

server.listen(process.env.PORT || 8083)