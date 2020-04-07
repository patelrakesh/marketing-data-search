import Router from 'koa-router'

import search from './routes/search'
import searchPosition from './routes/search-position'
import searchGenre from './routes/search-genre'
import fetchContact from './routes/fetch-contact'

import authentication from '../common/middlewares/authentication'

import validator from '../common/utils/validations'

const router = new Router()

export default () => {

  router.use('/public', authentication.verifyToken())
  router.use('/public', validator.checkKeywords())

  router.use('/public', search())
  router.use('/public/positions', searchPosition())
  router.use('/public/genres', searchGenre())


  router.use('/app', authentication.verifyToken())
  router.use('/app', fetchContact())

  return router.routes()
}