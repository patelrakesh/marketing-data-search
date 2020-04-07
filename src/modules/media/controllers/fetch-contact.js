import MediaOutlet from '../models/media-outlet'
import constants from '../constants'

export default async ctx => {
  return await MediaOutlet.findById(ctx.params.id).select(constants.CONTACT_PROPERTIES).exec()
}