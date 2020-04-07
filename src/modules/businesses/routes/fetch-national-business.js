import Router from 'koa-router'
import controller from '../controllers/fetch-national-business'
import responseParsing from '../../common/utils/response-parsing'

const router = new Router()

export default () => {
  router.get('/:id', responseParsing.generalResponse(controller))

  return router.routes()
}