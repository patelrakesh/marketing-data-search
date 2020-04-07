import Router from 'koa-router'
import controller from '../controllers/search-categories'
import responseParsing from '../../common/utils/response-parsing'

const router = new Router()

export default () => {
  router.get('/', responseParsing.generalResponse(controller))

  return router.routes()
}