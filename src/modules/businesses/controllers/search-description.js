import BusinessDescription from '../models/business-description'
import constants from '../constants'

export default async ctx => {
  return await BusinessDescription.find({ label: { $regex: ctx.query.q, $options: 'i' } }).limit(constants.BUSINESS_DESCRIPTION_LIMIT).exec()
}