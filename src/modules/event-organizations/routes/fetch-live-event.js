import Router from 'koa-router'
import controller from '../controllers/fetch-live-event'
import responseParsing from '../../common/utils/response-parsing'

const router = new Router()

export default () => {
  router.get('/:id', responseParsing.generalResponse(controller))

  return router.routes()
}