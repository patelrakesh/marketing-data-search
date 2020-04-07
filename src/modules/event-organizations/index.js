import Router from 'koa-router'
import search from './routes/search'
import fetchLiveEvent from './routes/fetch-live-event'
import fetchEmail from './routes/fetch-email'
import fetchContact from './routes/fetch-contact'
import update from './routes/update'
import authentication from '../common/middlewares/authentication'

import validator from '../common/utils/validations'


const router = new Router()

export default () => {

  router.use('/public', authentication.verifyToken())
  router.use('/public', validator.checkKeywords())

  router.use('/public', search())
  router.use('/public', fetchLiveEvent())

  router.use('/app', authentication.verifyToken())
  router.use('/app', fetchEmail())
  router.use('/app', fetchContact())
  router.use('/app', update())

  return router.routes()
}