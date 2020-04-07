/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
import Router from 'koa-router'
import search from './routes/search'
import fetchContact from './routes/fetch-contact'
import searchCategories from './routes/search-categories'
import getMaxAudience from './routes/get-max-audience'
import authentication from '../common/middlewares/authentication'
import validator from '../common/utils/validations'

const router = new Router()

export default () => {

  router.use('/public', authentication.verifyToken())
  router.use('/public', validator.checkKeywords())

  router.use('/public', search())
  router.use('/public/categories', searchCategories())
  router.use('/public/maxAudience', getMaxAudience())

  router.use('/app', authentication.verifyToken())
  router.use('/app', fetchContact())

  return router.routes()
}