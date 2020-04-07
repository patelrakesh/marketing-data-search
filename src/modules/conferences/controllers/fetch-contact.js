import Conference from '../models/conference'
import constants from '../constants'

export default async ctx => {
  return await Conference.findById(ctx.params.id).select(constants.CONTACT_PROPERTIES).exec()
}