/* eslint-disable linebreak-style */
import Router from 'koa-router'
import fetchEmail from './routes/fetch-email'

import search from './routes/search'
import fetchLocal from './routes/fetch-local-business'
import fetchNational from './routes/fetch-national-business'
import update from './routes/update'

import searchDescription from './routes/search-description'
import authentication from '../common/middlewares/authentication'
import fetchContact from './routes/fetch-contact'

import validator from '../common/utils/validations'

const router = new Router()

export default () => {

  router.use('/public', authentication.verifyToken())
  router.use('/public', validator.checkKeywords())

  router.use('/public/local', fetchLocal())
  router.use('/public/national', fetchNational())
  router.use('/public/descriptions', searchDescription())

  router.use('/public', search())

  router.use('/app', authentication.verifyToken())
  router.use('/app', fetchEmail())
  router.use('/app', fetchContact())
  router.use('/app', update())

  return router.routes()
}