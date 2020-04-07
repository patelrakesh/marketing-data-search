import Router from 'koa-router'
import controller from '../controllers/fetch-email'
import responseParsing from '../../common/utils/response-parsing'

const router = new Router()

export default () => {
  router.get('/:id/email', responseParsing.generalResponse(controller))

  return router.routes()
}