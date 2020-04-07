import Router from 'koa-router'
import controller from '../controllers/fetch-contact'
import responseParsing from '../../common/utils/response-parsing'

const router = new Router()

export default () => {
  router.get('/:id/contact', responseParsing.generalResponse(controller))

  return router.routes()
}