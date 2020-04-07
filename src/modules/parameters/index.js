import Router from 'koa-router'
import searchJobTitles from './routes/search-job-titles'
import searchIndustries from './routes/search-industries'
import searchPositions from './routes/search-positions'
import authentication from '../common/middlewares/authentication'

const router = new Router()

export default () => {

    router.use('/public', authentication.verifyToken())
    router.use('/public/job-titles', searchJobTitles())
    router.use('/public/industries', searchIndustries())
    router.use('/public/positions', searchPositions())

    return router.routes()
}