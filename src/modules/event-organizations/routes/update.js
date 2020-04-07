import Router from 'koa-router'
import controller from '../controllers/update'
import responseParsing from '../../common/utils/response-parsing'

const router = new Router()

export default () => {
  router.put('/:id', responseParsing.generalResponse(controller))

  return router.routes()
}