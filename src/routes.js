import Router from 'koa-router'

// Import routes from different modules.
import eventOrganizations from './modules/event-organizations'
import businesses from './modules/businesses'
import parameters from './modules/parameters'
import media from './modules/media'
import conferences from './modules/conferences'

const mainRoute = new Router()
const subRoutes = new Router()

export default () => {
  // Add Routes.
  subRoutes.use('/event-organizations', eventOrganizations())
  subRoutes.use('/businesses', businesses())
  subRoutes.use('/parameters', parameters())
  subRoutes.use('/media', media())
  subRoutes.use('/conferences', conferences())

  mainRoute.use('/api', subRoutes.routes())

  return mainRoute.routes()
}