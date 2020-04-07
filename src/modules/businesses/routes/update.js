import Router from 'koa-router'
import controller from '../controllers/search'
import responseParsing from '../../common/utils/response-parsing'

const router = new Router()

export default () => {
  router.put('/:type/:id', responseParsing.generalResponse(controller))

  return router.routes()
}